import { Module } from '@nestjs/common';
import { InterviewRoundController } from './interview-round.controller';
import { InterviewRoundService } from './interview-round.service';

@Module({
  controllers: [InterviewRoundController],
  providers: [InterviewRoundService]
})
export class InterviewRoundModule {}
