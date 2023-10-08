import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CountersModule } from '../counters/counters.module';
import jwtConfig from '../iam/config/jwt.config';
import { Label, LabelSchema } from '../labels/entities/label.entity';
import { Status, StatusSchema } from '../statuses/entities/status.entity';
import { User, UserSchema } from '../users/enitities/user.entity';
import { Task, TaskSchema } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    CountersModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Label.name,
        schema: LabelSchema,
      },
      {
        name: Status.name,
        schema: StatusSchema,
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
