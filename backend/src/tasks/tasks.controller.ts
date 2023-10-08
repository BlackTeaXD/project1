import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { AccessTokenGuard } from '../iam/authentication/guards/access-token.guard';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { GetTasksQueryDto } from './dto/get-tasks.dto';
import { TasksService } from './tasks.service';
import { CreateTaskRequestDto } from './dto/create-task.dto';
import { UpdateTaskRequestDto } from './dto/update-task.dto';

@UseGuards(AccessTokenGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createTaskRequestDto: CreateTaskRequestDto,
  ) {
    return this.tasksService.create(user, createTaskRequestDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @ActiveUser() user: ActiveUserData,
    @Query() getTasksQueryDto: GetTasksQueryDto,
  ) {
    return this.tasksService.findAll(user, getTasksQueryDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskRequestDto: UpdateTaskRequestDto,
  ) {
    return this.tasksService.update(id, updateTaskRequestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.tasksService.remove(id);
    return;
  }
}
