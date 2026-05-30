import { Injectable } from '@nestjs/common';
import { db } from '../database/db';

@Injectable()
export class UserAuthService {

    async getUserMode(userId: number) {

  const result = await db.query(
    `
    SELECT
      u.name,
      qm.mode
    FROM users u
    JOIN user_question_modes uqm
      ON u.id = uqm.user_id
    JOIN question_modes qm
      ON qm.id = uqm.question_mode_id
    WHERE u.id = $1
    `,
    [userId],
  );

  return result.rows[0];
}
  async register(
    name: string,
    email: string,
    password: string,
  ) {

    const result = await db.query(
      `
      INSERT INTO users
      (name,email,password)
      VALUES
      ($1,$2,$3)
      RETURNING *
      `,
      [name,email,password],
    );

    const user = result.rows[0];

    await db.query(
      `
      INSERT INTO user_question_modes
      (user_id,question_mode_id)
      VALUES
      ($1,1)
      `,
      [user.id],
    );

    return {
      success:true,
      user,
    };
  }

  async login(
    email: string,
    password: string,
  ) {
      console.log('Email:', email);
  console.log('Password:', password);

    const result = await db.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      AND password = $2
      `,
      [email,password],
    );

    return result.rows[0];
  }
}