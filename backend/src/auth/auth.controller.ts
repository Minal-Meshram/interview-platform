import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: any) {

    return this.authService.register(
      body.name,
      body.email,
      body.password,
    );
  }

  @Post('login')
  async login(@Body() body: any) {

    const admin =
      await this.authService.login(
        body.email,
        body.password,
      );

    if (!admin) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }

    return {
      success: true,
      admin,
    };
  }
}