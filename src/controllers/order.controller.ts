import { Request, Response } from 'express';
import { OrderModel } from '../models/order.model';

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.index(req.params.userId);
    res.status(200).send({ status: 200, orders, success: true });
  } catch (err: any) {
    res.status(500).send({ status: 500, message: err.message, success: false });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.create({ ...req.body });
    res.status(201).send({ status: 201, order, success: true });
  } catch (err: any) {
    res.status(500).send({ status: 500, message: err.message, success: false });
  }
};

const showOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.show(req.params.id);

    if (!order) {
      return res
        .status(404)
        .send({ status: 404, message: 'Order Not Found', success: false });
    }

    res.status(200).send({ status: 200, order, success: true });
  } catch (err: any) {
    res.status(500).send({ status: 500, message: err.message, success: false });
  }
};

export { getAllOrders, createOrder, showOrderById };
