import { Module } from '@nestjs/common';
import { QuestionModeController } from './question-mode.controller';
import { QuestionModeService } from './question-mode.service';

@Module({
  controllers: [QuestionModeController],
  providers: [QuestionModeService]
})
export class QuestionModeModule {}
