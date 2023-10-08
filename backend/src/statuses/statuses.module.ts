import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CountersModule } from '../counters/counters.module';
import jwtConfig from '../iam/config/jwt.config';
import { Status, StatusSchema } from './entities/status.entity';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';

@Module({
  imports: [
    CountersModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    MongooseModule.forFeature([
      {
        name: Status.name,
        schema: StatusSchema,
      },
    ]),
  ],
  controllers: [StatusesController],
  providers: [StatusesService],
})
export class StatusesModule {}
