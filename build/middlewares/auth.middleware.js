"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = exports.create = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const create = async (req, res) => {
    try {
        const token = req.header('Authorization');
        jsonwebtoken_1.default.verify(String(token), process.env.JWT_KEY);
    }
    catch (err) {
        return res.status(401).json('Access denied, invalid token');
    }
};
exports.create = create;
const verifyAuthToken = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decoded = jsonwebtoken_1.default.verify(String(token), process.env.JWT_KEY);
        next();
    }
    catch (error) {
        return res.status(401);
    }
};
exports.verifyAuthToken = verifyAuthToken;
