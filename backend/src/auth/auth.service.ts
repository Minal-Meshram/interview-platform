// auth.service.ts

import { Injectable } from '@nestjs/common';
import { db } from '../database/db';

@Injectable()
export class AuthService {
    async register(
  name: string,
  email: string,
  password: string,
) {

  const result = await db.query(
    `
    INSERT INTO admins
    (name, email, password)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `,
    [name, email, password],
  );


await db.query(
  `
  INSERT INTO user_question_modes
  (user_id, question_mode_id)
  VALUES
  ($1, 1)
  `,
  [result.rows[0].id]
);

  return {
    success: true,
    admin: result.rows[0],
  };
}

  async login(email: string, password: string) {

    const result = await db.query(
      `
      SELECT *
      FROM admins
      WHERE email = $1
      AND password = $2
      `,
      [email, password],
    );

    return result.rows[0];
  }
}