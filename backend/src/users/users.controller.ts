import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../iam/authentication/guards/access-token.guard';
import { GetUserResponseDto } from './dto/get-user.dto';
import {
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<GetUserResponseDto[]> {
    return this.usersService.getUsers();
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    return this.usersService.updateUser(id, updateUserRequestDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
    return;
  }
}
