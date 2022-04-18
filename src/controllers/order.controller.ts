import { Request, Response } from 'express';
import { OrderModel } from '../models/order.model';

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await OrderModel.index(req.params.userId);
  res.status(200).send({ status: 200, orders, success: true });
};

const createOrder = async (req: Request, res: Response) => {
  const order = await OrderModel.create({ ...req.body });
  res.status(201).send({ status: 201, order, success: true });
};

const showOrderById = async (req: Request, res: Response) => {
  const order = await OrderModel.show(req.params.id);

  if (!order) {
    return res
      .status(404)
      .send({ status: 404, message: 'Order Not Found', success: false });
  }

  res.status(200).send({ status: 200, order, success: true });
};

export { getAllOrders, createOrder, showOrderById };
