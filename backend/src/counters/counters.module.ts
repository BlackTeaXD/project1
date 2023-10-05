import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountersService } from './counters.service';
import { Counter, CounterSchema } from './entities/counter.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Counter.name,
        schema: CounterSchema,
      },
    ]),
  ],
  providers: [CountersService],
  exports: [CountersService],
})
export class CountersModule {}
