import { Injectable } from '@nestjs/common';
import { db } from '../database/db';

@Injectable()
export class UserQuestionModeService {

  async getAllUsersWithModes() {

    const result = await db.query(`
      SELECT
        u.id,
        u.name,
        qm.mode
      FROM users u
      JOIN user_question_modes uqm
        ON u.id = uqm.user_id
      JOIN question_modes qm
        ON qm.id = uqm.question_mode_id
         ORDER BY u.id
    `);

    return result.rows;
  }

  async getUsers() {

    const result = await db.query(`
      SELECT
        id,
        name
      FROM users
    `);

    return result.rows;
  }

  async updateUserMode(
    userId: number,
    questionModeId: number,
  ) {

    const result = await db.query(
      `
      UPDATE user_question_modes
      SET question_mode_id = $1
      WHERE user_id = $2
      RETURNING *
      `,
      [questionModeId, userId],
    );

    return result.rows[0];
  }

  
  async createUser(name: string,  email: string) {

  const result = await db.query(
    `
    INSERT INTO users(name, email)
    VALUES($1, $2)
    RETURNING *
    `,
    [name, email],
  );

  const user = result.rows[0];

  await db.query(
    `
    INSERT INTO user_question_modes
    (user_id, question_mode_id)
    VALUES
    ($1, 1)
    `,
    [user.id],
  );

  return user;
}
}