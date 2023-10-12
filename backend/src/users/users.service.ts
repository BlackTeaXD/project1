import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashingService } from '../iam/hashing/hashing.service';
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

    return this.userModel
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
  }

  deleteUser(id: number) {
    return this.userModel.deleteOne({ id }).exec();
  }
}
