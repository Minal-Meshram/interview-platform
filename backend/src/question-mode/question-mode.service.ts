import { Injectable } from '@nestjs/common';
import { db } from '../database/db';

@Injectable()
export class QuestionModeService {

  async getModes() {

    const result = await db.query(
      'SELECT * FROM question_modes'
    );

    return result.rows;
  }
}