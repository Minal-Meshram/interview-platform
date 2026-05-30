import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Post,
} from '@nestjs/common';

import { UserQuestionModeService } from './user-question-mode.service';

@Controller('user-question-mode')
export class UserQuestionModeController {

  constructor(
    private readonly service: UserQuestionModeService,
  ) {}

  @Get()
  getAllUsers() {
    return this.service.getAllUsersWithModes();
  }

  @Get('users')
  getUsers() {
    return this.service.getUsers();
  }

  @Put(':userId')
  updateUserMode(
    @Param('userId') userId: string,
    @Body() body: any,
  ) {
    return this.service.updateUserMode(
      Number(userId),
      Number(body.questionModeId),
    );
  }

  @Post('user')
createUser(
  @Body() body: any,
) {
  return this.service.
  createUser(
    body.name,
    body.email
  );
}
}