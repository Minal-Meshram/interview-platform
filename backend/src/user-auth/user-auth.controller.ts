import {
  Controller,
  Post,
  Get,
  Body,
  Param,
} from '@nestjs/common';

import { UserAuthService } from './user-auth.service';

@Controller('user-auth')
export class UserAuthController {

  constructor(
    private readonly service: UserAuthService,
  ) {}

  @Post('login')
  async login(
    @Body() body: any,
  ) {

    const user =
      await this.service.login(
        body.email,
        body.password,
      );

    if (!user) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }

    return {
      success: true,
      user,
    };
  }

  @Get(':userId')
  getUserMode(
    @Param('userId') userId: string,
  ) {
    return this.service.getUserMode(
      Number(userId),
    );
  }
}