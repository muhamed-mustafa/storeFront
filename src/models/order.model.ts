import Client from '../database';
import { toCamelCase } from './utils/to-camel-case';

export type OrderProduct = {
  product_id: number;
  quantity: number;
};

export type OrderAttrs = {
  id?: string;
  user_id: number;
  products: OrderProduct[];
  status?: string;
  created_at?: string;
  updated_at?: string;
};

export class OrderModel {
  static async index(userId: string) {
    try {
      const conn = await Client.connect();

      const { rows } = await conn.query(
        'SELECT * FROM orders WHERE user_id = $1',
        [userId]
      );

      const orders = [];

      for (const order of rows) {
        const { rows: order_products } = await conn.query(
          'SELECT product_id, quantity FROM order_products WHERE order_id = $1',
          [order.id]
        );

        orders.push({
          ...order,
          products: order_products,
        });
      }

      conn.release();

      return toCamelCase(orders);
    } catch (err) {
      throw new Error('can not get orders');
    }
  }

  static async create(order: OrderAttrs) {
    const { products, user_id } = order;

    try {
      const conn = await Client.connect();
      const { rows } = await conn.query(
        'INSERT INTO orders (user_id) VALUES($1) RETURNING *',
        [user_id]
      );
      const order = toCamelCase(rows)[0];

      const order_products = [];

      for (const product of products) {
        const { product_id, quantity } = product;

        const { rows } = await conn.query(
          'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity;',
          [order.id, product_id, quantity]
        );

        order_products.push(toCamelCase(rows)[0]);
      }

      conn.release();

      return {
        ...order,
        products: order_products,
      };
    } catch (err) {
      throw new Error('can not add order');
    }
  }

  static async show(id: string) {
    try {
      const conn = await Client.connect();
      const { rows } = await conn.query('SELECT * FROM orders WHERE id = $1', [
        id,
      ]);
      const order = toCamelCase(rows)[0];

      const { rows: order_products } = await conn.query(
        'SELECT product_id, quantity FROM order_products WHERE order_id = $1',
        [id]
      );

      const order_products_rows = toCamelCase(order_products);
      conn.release();
      return {
        ...order,
        order_products_rows,
      };
    } catch (err) {
      throw new Error('Order is not exist');
    }
  }
}
