import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CountersModule } from '../counters/counters.module';
import jwtConfig from '../iam/config/jwt.config';
import { Label, LabelSchema } from './entities/label.entity';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';

@Module({
  imports: [
    CountersModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    MongooseModule.forFeature([
      {
        name: Label.name,
        schema: LabelSchema,
      },
    ]),
  ],
  controllers: [LabelsController],
  providers: [LabelsService],
})
export class LabelsModule {}
