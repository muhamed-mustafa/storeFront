"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
const to_camel_case_1 = require("./utils/to-camel-case");
class OrderModel {
    static async index(userId) {
        try {
            const conn = await database_1.default.connect();
            const { rows } = await conn.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
            const orders = [];
            for (const order of rows) {
                const { rows: order_products } = await conn.query('SELECT product_id, quantity FROM order_products WHERE order_id = $1', [order.id]);
                orders.push({
                    ...order,
                    products: order_products,
                });
            }
            conn.release();
            return (0, to_camel_case_1.toCamelCase)(orders);
        }
        catch (err) {
            throw new Error('can not get orders');
        }
    }
    static async create(order) {
        const { products, user_id } = order;
        try {
            const conn = await database_1.default.connect();
            const { rows } = await conn.query('INSERT INTO orders (user_id) VALUES($1) RETURNING *', [user_id]);
            const order = (0, to_camel_case_1.toCamelCase)(rows)[0];
            const order_products = [];
            for (const product of products) {
                const { product_id, quantity } = product;
                const { rows } = await conn.query('INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity;', [order.id, product_id, quantity]);
                order_products.push((0, to_camel_case_1.toCamelCase)(rows)[0]);
            }
            conn.release();
            return {
                ...order,
                products: order_products,
            };
        }
        catch (err) {
            throw new Error('can not add order');
        }
    }
    static async show(id) {
        try {
            const conn = await database_1.default.connect();
            const { rows } = await conn.query('SELECT * FROM orders WHERE id = $1', [
                id,
            ]);
            const order = (0, to_camel_case_1.toCamelCase)(rows)[0];
            const { rows: order_products } = await conn.query('SELECT product_id, quantity FROM order_products WHERE order_id = $1', [id]);
            const order_products_rows = (0, to_camel_case_1.toCamelCase)(order_products);
            conn.release();
            return {
                ...order,
                order_products_rows,
            };
        }
        catch (err) {
            throw new Error('Order is not exist');
        }
    }
}
exports.OrderModel = OrderModel;
