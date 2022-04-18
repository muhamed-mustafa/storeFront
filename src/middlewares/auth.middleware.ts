import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const create = async (req: Request, res: Response) => {
  try {
    const token = req.header('Authorization');
    jwt.verify(String(token), process.env.JWT_KEY!);
  } catch (err) {
    return res.status(401).json('Access denied, invalid token');
  }
};

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(String(token), process.env.JWT_KEY!);
    next();
  } catch (error) {
    return res.status(401);
  }
};

export { create, verifyAuthToken };
