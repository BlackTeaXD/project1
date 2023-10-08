import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountersService } from '../../counters/counters.service';
import { SequenceName } from '../../counters/enums/sequence-name.enum';
import { User } from '../../users/enitities/user.entity';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { SignInRequestDto } from './dto/sign-in.dto';
import { SignUpRequestDto } from './dto/sign-up.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly countersService: CountersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpRequestDto: SignUpRequestDto) {
    const userWithSameEmail = await this.userModel
      .findOne({
        email: signUpRequestDto.email,
      })
      .exec();
    if (userWithSameEmail) {
      throw new ConflictException('User with this email already exists');
    }

    const id = await this.countersService.getNextSequenceValue(
      SequenceName.User,
    );
    const password = await this.hashingService.hash(signUpRequestDto.password);
    const user = await this.userModel
      .findOneAndUpdate(
        { email: signUpRequestDto.email },
        { ...signUpRequestDto, id, password },
        { new: true, upsert: true },
      )
      .select({ _id: 0, id: 1, firstname: 1, lastname: 1, email: 1 })
      .exec();
    const accessToken = await this.generateAccessToken(user);

    return { user, accessToken };
  }

  async signIn(signInRequestDto: SignInRequestDto) {
    const user = await this.userModel
      .findOne({ email: signInRequestDto.email })
      .exec();
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const isPasswordEqual = await this.hashingService.compare(
      signInRequestDto.password,
      user.password,
    );
    if (!isPasswordEqual) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const accessToken = await this.generateAccessToken(user);

    return { user, accessToken };
  }

  private generateAccessToken(user: User) {
    return this.jwtService.signAsync(
      { sub: user.id, email: user.email } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
  }
}
