import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.index();
    res.status(200).send({ status: 200, users, success: true });
  } catch (err: any) {
    res.status(500).send({ status: 500, message: err.message, success: false });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.create({ ...req.body });
    const { id } = user;
    const token = jwt.sign(id, process.env.JWT_KEY!);
    res.status(201).send({ status: 201, user, token, success: true });
  } catch (err: any) {
    res.status(500).send({ status: 500, message: err.message, success: false });
  }
};

const showUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.show(Number(req.params.id));

    if (!user) {
      return res
        .status(404)
        .send({ status: 404, message: 'User Not Found', success: false });
    }

    res.status(200).send({ status: 200, user, success: true });
  } catch (err: any) {
    res.status(500).send({ status: 500, message: err.message, success: false });
  }
};

export { getAllUsers, showUserById, createUser };
