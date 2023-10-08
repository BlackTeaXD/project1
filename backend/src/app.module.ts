import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IamModule } from './iam/iam.module';
import { UsersModule } from './users/users.module';
import { CountersModule } from './counters/counters.module';
import { LabelsModule } from './labels/labels.module';
import { StatusesModule } from './statuses/statuses.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    IamModule,
    UsersModule,
    CountersModule,
    LabelsModule,
    StatusesModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
