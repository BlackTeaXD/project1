import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AccessTokenGuard } from '../iam/authentication/guards/access-token.guard';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import {
  CreateLabelRequestDto,
  CreateLabelResponseDto,
} from './dto/create-label.dto';
import {
  UpdateLabelRequestDto,
  UpdateLabelResponseDto,
} from './dto/update-label.dto';
import { LabelsService } from './labels.service';

@UseGuards(AccessTokenGuard)
@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createLabelRequestDto: CreateLabelRequestDto,
  ): Promise<CreateLabelResponseDto> {
    return this.labelsService.create(user, createLabelRequestDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.labelsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.labelsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLabelRequestDto: UpdateLabelRequestDto,
  ): Promise<UpdateLabelResponseDto> {
    return this.labelsService.update(id, updateLabelRequestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.labelsService.remove(id);
    return;
  }
}
