"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
const to_camel_case_1 = require("./utils/to-camel-case");
class ProductModel {
    static async index() {
        try {
            const conn = await database_1.default.connect();
            const { rows } = await conn.query('SELECT * FROM products');
            conn.release();
            return (0, to_camel_case_1.toCamelCase)(rows);
        }
        catch (err) {
            throw new Error(`Could not get products. ${err}`);
        }
    }
    static async create(product) {
        const { name, price, category } = product;
        try {
            const conn = await database_1.default.connect();
            const { rows } = await conn.query('INSERT INTO products (name, price,category) VALUES($1,$2,$3) RETURNING *', [name, price, category]);
            conn.release();
            return (0, to_camel_case_1.toCamelCase)(rows)[0];
        }
        catch (err) {
            throw new Error('can not add product');
        }
    }
    static async show(id) {
        try {
            const conn = await database_1.default.connect();
            const { rows } = await conn.query('SELECT * FROM products WHERE id = $1', [id]);
            conn.release();
            return (0, to_camel_case_1.toCamelCase)(rows)[0];
        }
        catch (err) {
            throw new Error('Product is not found');
        }
    }
}
exports.ProductModel = ProductModel;
