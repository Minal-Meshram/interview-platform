import { Injectable } from '@nestjs/common';
import { db } from '../database/db';

@Injectable()
export class InterviewRoundService {

  async updateRound(
    roundId: number,
    questionModeId: number,
  ) {

    const result = await db.query(

      `UPDATE interview_rounds
       SET question_mode_id = $1
       WHERE id = $2
       RETURNING *`,

      [questionModeId, roundId]
    );

    return result.rows[0];
  }
}