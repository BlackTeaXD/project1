import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MONGO_DUPLICATION_KEY_ERROR_CODE } from '../constants';
import { HashingService } from '../iam/hashing/hashing.service';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { UpdateUserRequestDto } from './dto/update-user.dto';
import { User } from './enitities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly hashingService: HashingService,
  ) {}

  getUsers() {
    return this.userModel
      .find()
      .select({
        _id: 0,
        id: 1,
        email: 1,
        firstname: 1,
        lastname: 1,
        createdAt: 1,
      })
      .exec();
  }

  async getUser(id: number) {
    const user = await this.userModel
      .findOne({ id })
      .select({
        _id: 0,
        id: 1,
        email: 1,
        firstname: 1,
        lastname: 1,
        createdAt: 1,
      })
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: number, updateUserRequestDto: UpdateUserRequestDto) {
    let password: string | undefined = updateUserRequestDto.password;
    if (password) {
      password = await this.hashingService.hash(password);
    }

    try {
      return await this.userModel
        .findOneAndUpdate(
          { id },
          { ...updateUserRequestDto, password },
          { new: true },
        )
        .select({
          _id: 0,
          id: 1,
          firstname: 1,
          lastname: 1,
          email: 1,
          createdAt: 1,
        })
        .exec();
    } catch (error) {
      if (error.code === MONGO_DUPLICATION_KEY_ERROR_CODE) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  deleteUser(user: ActiveUserData, id: number) {
    if (user.sub === id) {
      throw new ForbiddenException('Unable to delete this user');
    }
    return this.userModel.deleteOne({ id }).exec();
  }
}
