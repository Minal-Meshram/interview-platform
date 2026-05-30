import {
  Body,
  Controller,
  Param,
  Put
} from '@nestjs/common';

import { InterviewRoundService }
from './interview-round.service';

@Controller('interview-round')
export class InterviewRoundController {

  constructor(
    private readonly service: InterviewRoundService
  ) {}

  @Put(':id')
  updateRound(
    @Param('id') id: string,
    @Body() body: any
  ) {

    console.log(body);

    return this.service.updateRound(
      Number(id),
      Number(body.questionModeId)
    );
  }
}