import * as _ from 'lodash';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInRequestDto, SignInResponseDto } from './dto/sign-in.dto';
import { SignUpRequestDto, SignUpResponseDto } from './dto/sign-up.dto';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(
    @Body() signUpRequestDto: SignUpRequestDto,
  ): Promise<SignUpResponseDto> {
    const { user, accessToken } =
      await this.authenticationService.signUp(signUpRequestDto);
    return { user, accessKey: accessToken };
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInRequestDto: SignInRequestDto,
  ): Promise<SignInResponseDto> {
    const { user, accessToken } =
      await this.authenticationService.signIn(signInRequestDto);
    return {
      user: _.pick(user, ['id', 'firstname', 'lastname', 'email']),
      accessKey: accessToken,
    };
  }
}
