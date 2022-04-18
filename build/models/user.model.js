"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const to_camel_case_1 = require("./utils/to-camel-case");
const Password_service_1 = require("../services/Password.service");
class UserModel {
    static async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const { rows } = await conn.query(sql);
            conn.release();
            return (0, to_camel_case_1.toCamelCase)(rows);
        }
        catch (err) {
            throw new Error('Users Not Found');
        }
    }
    static async create(user) {
        const { first_name, last_name, email, password } = user;
        const hashedPassword = await Password_service_1.Password.toHash(password);
        try {
            const conn = await database_1.default.connect();
            const { rows } = await conn.query('INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *;', [first_name, last_name, email, hashedPassword]);
            conn.release();
            return (0, to_camel_case_1.toCamelCase)(rows)[0];
        }
        catch (err) {
            throw new Error('can not add user.');
        }
    }
    static async show(id) {
        try {
            const conn = await database_1.default.connect();
            const { rows } = await conn.query('SELECT * FROM users WHERE id = $1', [
                id,
            ]);
            conn.release();
            return (0, to_camel_case_1.toCamelCase)(rows)[0];
        }
        catch (err) {
            throw new Error('User is not exists');
        }
    }
}
exports.UserModel = UserModel;
