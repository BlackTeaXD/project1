import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as _ from 'lodash';
import { CountersService } from '../counters/counters.service';
import { SequenceName } from '../counters/enums/sequence-name.enum';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { Label } from '../labels/entities/label.entity';
import { Status } from '../statuses/entities/status.entity';
import { User } from '../users/enitities/user.entity';
import { CreateTaskRequestDto } from './dto/create-task.dto';
import { GetTasksQueryDto } from './dto/get-tasks.dto';
import { UpdateTaskRequestDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
    @InjectModel(Label.name)
    private readonly labelModel: Model<Label>,
    @InjectModel(Status.name)
    private readonly statusModel: Model<Status>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly countersService: CountersService,
  ) {}

  async create(
    user: ActiveUserData,
    createTaskRequestDto: CreateTaskRequestDto,
  ) {
    const task = await this.taskModel
      .findOne({ title: createTaskRequestDto.title })
      .exec();
    if (task) {
      throw new ConflictException('Task already exists');
    }

    const [{ id: authorId }, assignee, status, rawLabels] = await Promise.all([
      this.userModel.findOne({ id: user.sub }).exec(),
      this.userModel.findOne({ id: createTaskRequestDto.assigneeId }).exec(),
      this.statusModel.findOne({ id: createTaskRequestDto.statusId }).exec(),
      this.labelModel.find({ id: createTaskRequestDto.labelIds }).exec(),
    ]);
    const labelIds = rawLabels.map((label) => label.id);
    const statusId = status?.id;
    const assigneeId = assignee?.id;
    const id = await this.countersService.getNextSequenceValue(
      SequenceName.Task,
    );

    await this.taskModel.updateOne(
      {
        title: createTaskRequestDto.title,
      },
      {
        id,
        title: createTaskRequestDto.title,
        description: createTaskRequestDto.description,
        status: statusId,
        labels: labelIds,
        assignee: assigneeId,
        author: authorId,
      },
      { upsert: true },
    );

    return this.getOnePopulatedTask({ title: createTaskRequestDto.title });
  }

  findAll(user: ActiveUserData, getTasksQueryDto: GetTasksQueryDto) {
    const filters = _.reduce(
      getTasksQueryDto,
      (acc, value, key) => {
        if (key === 'selfAuthored') {
          return { ...acc, author: user.sub };
        }
        return { ...acc, [key]: value };
      },
      {},
    );

    return this.getPopulatedTasks(filters);
  }

  async findOne(id: number) {
    const task = await this.getOnePopulatedTask({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(id: number, updateTaskRequestDto: UpdateTaskRequestDto) {
    const task = await this.taskModel.findOne({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const [assignee, status, rawLabels] = await Promise.all([
      this.userModel.findOne({ id: updateTaskRequestDto?.assigneeId }).exec(),
      this.statusModel.findOne({ id: updateTaskRequestDto?.statusId }).exec(),
      this.labelModel.find({ id: updateTaskRequestDto?.labelIds }).exec(),
    ]);
    const labelIds = rawLabels.map((label) => label.id);
    const statusId = status?.id;
    const assigneeId = assignee?.id;

    const update = _.pickBy(
      {
        title: updateTaskRequestDto.title,
        description: updateTaskRequestDto.description,
        labels: labelIds.length ? labelIds : null,
        status: statusId,
        assignee: assigneeId,
      },
      _.identity,
    );

    await this.taskModel.updateOne({ id }, update);

    return this.getOnePopulatedTask({ id });
  }

  remove(id: number) {
    return this.taskModel.findOneAndRemove({ id });
  }

  private getPopulatedTasks(filters?: Record<string, string | number>) {
    return this.taskModel
      .aggregate()
      .match(filters)
      .lookup({
        from: 'status',
        localField: 'status',
        foreignField: 'id',
        as: 'status',
      })
      .lookup({
        from: 'labels',
        localField: 'labels',
        foreignField: 'id',
        as: 'labels',
      })
      .lookup({
        from: 'users',
        localField: 'author',
        foreignField: 'id',
        as: 'author',
      })
      .lookup({
        from: 'users',
        localField: 'assignee',
        foreignField: 'id',
        as: 'assignee',
      })
      .project({
        _id: 0,
        id: 1,
        title: 1,
        description: 1,
        createdAt: 1,
        status: '$status.title',
        labels: '$labels.title',
        author: {
          id: 1,
          email: 1,
          firstname: 1,
          lastname: 1,
        },
        assignee: {
          id: 1,
          email: 1,
          firstname: 1,
          lastname: 1,
        },
      })
      .unwind('$author')
      .unwind('$status')
      .unwind({ path: '$assignee', preserveNullAndEmptyArrays: true })
      .addFields({
        assignee: {
          $cond: {
            if: {
              $ne: [{ $ifNull: ['$assignee', null] }, null],
            },
            then: '$assignee',
            else: {},
          },
        },
      });
  }

  private async getOnePopulatedTask(filters?: Record<string, string | number>) {
    return (await this.getPopulatedTasks(filters))[0];
  }
}
