import Client from '../database';
import { toCamelCase } from './utils/to-camel-case';
import { Password } from '../services/Password.service';

export type UserAttrs = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at?: string;
  updated_at?: string;
};

export class UserModel {
  static async index() {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const { rows } = await conn.query(sql);

      conn.release();

      return toCamelCase(rows);
    } catch (err) {
      throw new Error('Users Not Found');
    }
  }

  static async create(user: UserAttrs) {
    const { first_name, last_name, email, password } = user;

    const hashedPassword = await Password.toHash(password);

    try {
      const conn = await Client.connect();
      const { rows } = await conn.query(
        'INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *;',
        [first_name, last_name, email, hashedPassword]
      );

      conn.release();

      return toCamelCase(rows)[0];
    } catch (err) {
      throw new Error('can not add user.');
    }
  }

  static async show(id: number) {
    try {
      const conn = await Client.connect();
      const { rows } = await conn.query('SELECT * FROM users WHERE id = $1', [
        id,
      ]);

      conn.release();

      return toCamelCase(rows)[0];
    } catch (err) {
      throw new Error('User is not exists');
    }
  }
}
