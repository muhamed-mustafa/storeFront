"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.showUserById = exports.getAllUsers = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = async (req, res) => {
    const users = await user_model_1.UserModel.index();
    res.status(200).send({ status: 200, users, success: true });
};
exports.getAllUsers = getAllUsers;
const createUser = async (req, res) => {
    const user = await user_model_1.UserModel.create({ ...req.body });
    const { id } = user;
    const token = jsonwebtoken_1.default.sign(id, process.env.JWT_KEY);
    res.status(201).send({ status: 201, user, token, success: true });
};
exports.createUser = createUser;
const showUserById = async (req, res) => {
    const user = await user_model_1.UserModel.show(Number(req.params.id));
    if (!user) {
        return res
            .status(404)
            .send({ status: 404, message: 'User Not Found', success: false });
    }
    res.status(200).send({ status: 200, user, success: true });
};
exports.showUserById = showUserById;
