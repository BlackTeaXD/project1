import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { AccessTokenGuard } from '../iam/authentication/guards/access-token.guard';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import {
  CreateStatusRequestDto,
  CreateStatusResponseDto,
} from './dto/create-status.dto';
import {
  UpdateStatusRequestDto,
  UpdateStatusResponseDto,
} from './dto/update-status.dto';
import { StatusesService } from './statuses.service';

@UseGuards(AccessTokenGuard)
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createStatusRequestDto: CreateStatusRequestDto,
  ): Promise<CreateStatusResponseDto> {
    return this.statusesService.create(user, createStatusRequestDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.statusesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.statusesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateStatusRequestDto,
  ): Promise<UpdateStatusResponseDto> {
    return this.statusesService.update(id, updateStatusDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.statusesService.remove(id);
    return;
  }
}
