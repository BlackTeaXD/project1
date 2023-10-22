import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MONGO_DUPLICATION_KEY_ERROR_CODE } from '../constants';
import { CountersService } from '../counters/counters.service';
import { SequenceName } from '../counters/enums/sequence-name.enum';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { CreateLabelRequestDto } from './dto/create-label.dto';
import { UpdateLabelRequestDto } from './dto/update-label.dto';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelsService {
  constructor(
    @InjectModel(Label.name)
    private readonly labelModel: Model<Label>,
    private readonly countersService: CountersService,
  ) {}

  async create(
    user: ActiveUserData,
    createLabelRequestDto: CreateLabelRequestDto,
  ) {
    const label = await this.labelModel
      .findOne({
        title: createLabelRequestDto.title,
      })
      .exec();
    if (label) {
      throw new ConflictException('Label already exists');
    }

    const id = await this.countersService.getNextSequenceValue(
      SequenceName.Label,
    );
    return this.labelModel
      .findOneAndUpdate(
        { title: createLabelRequestDto.title },
        { ...createLabelRequestDto, id, userId: user.sub },
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
    return this.labelModel
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
    const label = await this.labelModel
      .findOne({ id })
      .select({
        _id: 0,
        id: 1,
        title: 1,
        createdAt: 1,
      })
      .exec();
    if (!label) {
      throw new NotFoundException('Label not found');
    }
    return label;
  }

  async update(id: number, updateLabelRequestDto: UpdateLabelRequestDto) {
    try {
      const label = await this.labelModel
        .findOneAndUpdate(
          { id },
          {
            ...updateLabelRequestDto,
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
      if (!label) {
        throw new NotFoundException('Label not found');
      }
      return label;
    } catch (error) {
      if (error.code === MONGO_DUPLICATION_KEY_ERROR_CODE) {
        throw new ConflictException('Label already exists');
      }
      throw error;
    }
  }

  remove(id: number) {
    return this.labelModel.findOneAndRemove({ id });
  }
}
