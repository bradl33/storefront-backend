import bcrypt from 'bcrypt';
import { PoolClient, QueryResult } from 'pg';
import Client from '../database';
import { pepper, saltRounds } from '../utils/hashingSecrets';
import { generateAccessToken } from '../auth/jsonToken';

export type UserType = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

export type CredentialType = {
  username: string;
  password: string;
  password_digest?: string;
};

export type UserReturnType = {
  firstname: string;
  lastname: string;
  username: string;
};

export class UserStore {
  async authenticate(credentials: CredentialType): Promise<string | null> {
    const { username, password } = credentials;

    const conn: PoolClient = await Client.connect();
    const sql =
      'SELECT id, username, password_digest FROM users WHERE username=$1';

    const result = await conn.query(sql, [username]);

    if (result.rows.length) {
      const u_id = result.rows[0].id;
      const u_name = result.rows[0].username;
      const p_digest = result.rows[0].password_digest;
      const token = generateAccessToken(u_id, u_name);

      if (bcrypt.compareSync(password + pepper, p_digest)) {
        return token;
      }
    }
    return null;
  }

  async createUser(user: UserType): Promise<UserReturnType> {
    try {
      const hashPassword: string = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds)
      );

      const { firstname, lastname, username } = user;
      const conn: PoolClient = await Client.connect();
      const sql = `INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING firstname, lastname, username`;
      const result: QueryResult = await conn.query(sql, [
        firstname,
        lastname,
        username,
        hashPassword
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create user. Error: ${err}`);
    }
  }

  async getOneUserById(userId: number): Promise<UserReturnType> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql =
        'SELECT firstname, lastname, username FROM users WHERE id = $1';
      const result: QueryResult = await conn.query(sql, [userId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user with id ${userId}. Error: ${err}`);
    }
  }

  async getAllUsers(): Promise<UserReturnType[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = 'SELECT firstname, lastname, username FROM users';
      const result: QueryResult = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all users. Error: ${err}`);
    }
  }

  async deleteUser(id: number): Promise<UserReturnType> {
    try {
      const sql = `DELETE FROM users WHERE id=$1 RETURNING firstname, lastname, username`;
      const conn: PoolClient = await Client.connect();
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
