import Client from '../database';
import { toCamelCase } from './utils/to-camel-case';

export type ProductAttrs = {
  id?: string;
  price: number;
  name: string;
  category: string;
  created_at?: string;
  updated_at?: string;
};

export class ProductModel {
  static async index() {
    try {
      const conn = await Client.connect();

      const { rows } = await conn.query('SELECT * FROM products');

      conn.release();

      return toCamelCase(rows);
    } catch (err) {
      throw new Error(`Could not get products. ${err}`);
    }
  }

  static async create(product: ProductAttrs) {
    const { name, price, category } = product;

    try {
      const conn = await Client.connect();
      const { rows } = await conn.query(
        'INSERT INTO products (name, price,category) VALUES($1,$2,$3) RETURNING *',
        [name, price, category]
      );

      conn.release();

      return toCamelCase(rows)[0];
    } catch (err) {
      throw new Error('can not add product');
    }
  }

  static async show(id: number) {
    try {
      const conn = await Client.connect();
      const { rows } = await conn.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
      );

      conn.release();

      return toCamelCase(rows)[0];
    } catch (err) {
      throw new Error('Product is not found');
    }
  }
}
