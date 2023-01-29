import { PoolClient, QueryResult } from 'pg';
import Client from '../database';

export type ProductType = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async createProduct(product: ProductType): Promise<ProductType> {
    try {
      const { name, price, category } = product;
      const conn: PoolClient = await Client.connect();
      const sql = `INSERT INTO products (name, price, category) 
      VALUES($1, $2, $3) RETURNING name, price, category`;
      const result: QueryResult = await conn.query(sql, [
        name,
        price,
        category
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create user. Error: ${err}`);
    }
  }

  async getOneProductById(productId: number): Promise<ProductType> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = `SELECT name, price, category FROM products WHERE id=$1`;
      const result: QueryResult = await conn.query(sql, [productId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get product by id ${productId}. Error: ${err}`
      );
    }
  }

  async getProductsByCat(category: string): Promise<ProductType[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = `SELECT name, price, category FROM products WHERE category=$1`;
      const result: QueryResult = await conn.query(sql, [category]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get product by category ${category}. Error: ${err}`
      );
    }
  }

  async getAllProducts(): Promise<ProductType[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = 'SELECT name, price, category FROM products';
      const result: QueryResult = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all products. Error: ${err}`);
    }
  }

  async deleteProduct(id: number): Promise<ProductType> {
    try {
      const sql = `DELETE FROM products WHERE id=$1 RETURNING name, price, category`;
      const conn: PoolClient = await Client.connect();
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
