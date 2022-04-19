"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showOrderById = exports.createOrder = exports.getAllOrders = void 0;
const order_model_1 = require("../models/order.model");
const getAllOrders = async (req, res) => {
    try {
        const orders = await order_model_1.OrderModel.index(req.params.userId);
        res.status(200).send({ status: 200, orders, success: true });
    }
    catch (err) {
        res.status(500).send({ status: 500, message: err.message, success: false });
    }
};
exports.getAllOrders = getAllOrders;
const createOrder = async (req, res) => {
    try {
        const order = await order_model_1.OrderModel.create({ ...req.body });
        res.status(201).send({ status: 201, order, success: true });
    }
    catch (err) {
        res.status(500).send({ status: 500, message: err.message, success: false });
    }
};
exports.createOrder = createOrder;
const showOrderById = async (req, res) => {
    try {
        const order = await order_model_1.OrderModel.show(req.params.id);
        if (!order) {
            return res
                .status(404)
                .send({ status: 404, message: 'Order Not Found', success: false });
        }
        res.status(200).send({ status: 200, order, success: true });
    }
    catch (err) {
        res.status(500).send({ status: 500, message: err.message, success: false });
    }
};
exports.showOrderById = showOrderById;
