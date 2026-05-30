import { Module } from '@nestjs/common';
import { UserQuestionModeService } from './user-question-mode.service';
import { UserQuestionModeController } from './user-question-mode.controller';

@Module({
  providers: [UserQuestionModeService],
  controllers: [UserQuestionModeController]
})
export class UserQuestionModeModule { }
