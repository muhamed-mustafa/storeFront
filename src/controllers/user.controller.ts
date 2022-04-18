import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.index();
  res.status(200).send({ status: 200, users, success: true });
};

const createUser = async (req: Request, res: Response) => {
  const user = await UserModel.create({ ...req.body });
  const { id } = user;
  const token = jwt.sign(id, process.env.JWT_KEY!);
  res.status(201).send({ status: 201, user, token, success: true });
};

const showUserById = async (req: Request, res: Response) => {
  const user = await UserModel.show(Number(req.params.id));

  if (!user) {
    return res
      .status(404)
      .send({ status: 404, message: 'User Not Found', success: false });
  }

  res.status(200).send({ status: 200, user, success: true });
};

export { getAllUsers, showUserById, createUser };
