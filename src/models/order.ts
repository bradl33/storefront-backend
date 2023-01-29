import { PoolClient, QueryResult } from 'pg';
import Client from '../database';

export type OrderType = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderUpdateType = {
  id: number;
  user_id?: string;
  status: string;
};

export type OrderItems = {
  id?: number;
  product_id: number;
  quantity: number;
};

export class OrderStore {
  async createOrderProducts(
    orderOwnerId: number,
    orderItems: OrderItems[]
  ): Promise<OrderType> {
    try {
      const conn: PoolClient = await Client.connect();

      const status = 'active';
      const userId = orderOwnerId;

      const sql = `INSERT INTO orders (user_id, status) 
      VALUES($1, $2) RETURNING id, user_id, status`;
      const result: QueryResult = await conn.query(sql, [userId, status]);
      const orderId: number = result.rows[0].id;

      orderItems.forEach(async (orderItem): Promise<void> => {
        const { product_id, quantity } = orderItem;
        const sql2 = `INSERT INTO order_products (order_id, product_id, quantity)
        VALUES ($1, $2, $3)`;
        await conn.query(sql2, [orderId, product_id, quantity]);
      });

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }

  async getUserActiveOrders(userId: number): Promise<OrderType[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = `SELECT id, user_id, status FROM orders WHERE user_id = $1 AND status='active'`;
      const result: QueryResult = await conn.query(sql, [userId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get active orders for user with id ${userId}. Error: ${err}`
      );
    }
  }

  async updateOrderStatus(
    orderToUpdate: OrderUpdateType
  ): Promise<OrderUpdateType> {
    try {
      const { id, status } = orderToUpdate;
      const conn: PoolClient = await Client.connect();
      const sql = `UPDATE orders SET status=$2 WHERE id=$1 RETURNING *`;
      const result: QueryResult = await conn.query(sql, [id, status]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order status. Error: ${err}`);
    }
  }

  async getUserCompletedOrders(userId: number): Promise<OrderType[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = `SELECT id, user_id, status FROM orders WHERE user_id = $1 AND status='completed'`;
      const result: QueryResult = await conn.query(sql, [userId]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get active orders for user with id ${userId}. Error: ${err}`
      );
    }
  }

  async getUserAllOrders(userId: number): Promise<OrderType[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = 'SELECT id, user_id, status FROM orders WHERE user_id = $1';
      const result: QueryResult = await conn.query(sql, [userId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get all orders for user ${userId}. Error: ${err}`
      );
    }
  }

  async deleteOrder(id: number): Promise<OrderType> {
    try {
      const sql = `DELETE FROM orders WHERE id=$1 RETURNING *`;
      const conn: PoolClient = await Client.connect();
      const result: QueryResult = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
