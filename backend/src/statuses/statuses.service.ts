import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountersService } from '../counters/counters.service';
import { SequenceName } from '../counters/enums/sequence-name.enum';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { CreateStatusRequestDto } from './dto/create-status.dto';
import { UpdateStatusRequestDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusesService {
  constructor(
    @InjectModel(Status.name)
    private readonly statusModel: Model<Status>,
    private readonly countersService: CountersService,
  ) {}

  async create(
    user: ActiveUserData,
    createStatusRequestDto: CreateStatusRequestDto,
  ) {
    const status = await this.statusModel
      .findOne({
        title: createStatusRequestDto.title,
      })
      .exec();
    if (status) {
      throw new ConflictException('Status already exists');
    }

    const id = await this.countersService.getNextSequenceValue(
      SequenceName.Status,
    );
    return this.statusModel
      .findOneAndUpdate(
        { title: createStatusRequestDto.title },
        { ...createStatusRequestDto, id, userId: user.sub },
        { new: true, upsert: true },
      )
      .select({
        _id: 0,
        id: 1,
        title: 1,
        createdAt: 1,
      })
      .exec();
  }

  findAll() {
    return this.statusModel
      .find()
      .populate('createdBy', '-_id id firstname lastname email')
      .select({
        _id: 0,
        id: 1,
        title: 1,
        userId: 1,
        createdAt: 1,
      })
      .exec();
  }

  async findOne(id: number) {
    const status = await this.statusModel
      .findOne({ id })
      .select({
        _id: 0,
        id: 1,
        title: 1,
        createdAt: 1,
      })
      .exec();
    if (!status) {
      throw new NotFoundException('Status not found');
    }
    return status;
  }

  async update(id: number, updateStatusRequestDto: UpdateStatusRequestDto) {
    const status = await this.statusModel
      .findOneAndUpdate(
        { id },
        {
          ...updateStatusRequestDto,
        },
        { new: true },
      )
      .select({
        _id: 0,
        id: 1,
        title: 1,
        createdAt: 1,
      })
      .exec();
    if (!status) {
      throw new NotFoundException('Status not found');
    }
    return status;
  }

  remove(id: number) {
    return this.statusModel.findOneAndRemove({ id });
  }
}
