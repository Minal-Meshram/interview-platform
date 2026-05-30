import { Controller, Get } from '@nestjs/common';
import { QuestionModeService } from './question-mode.service';

@Controller('question-mode')
export class QuestionModeController {

  constructor(
    private readonly service: QuestionModeService
  ) {}

  @Get()
  getModes() {
    return this.service.getModes();
  }
}