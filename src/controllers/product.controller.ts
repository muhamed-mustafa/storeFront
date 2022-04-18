import { Request, Response } from 'express';
import { ProductModel } from '../models/product.model';

const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.index();
  res.status(200).send({ status: 200, products, success: true });
};

const createProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.create({ ...req.body });
  res.status(201).send({ status: 201, product, success: true });
};

const showProductById = async (req: Request, res: Response) => {
  const product = await ProductModel.show(Number(req.params.id));

  if (!product) {
    return res
      .status(404)
      .send({ status: 404, message: 'Product Not Found', success: false });
  }

  res.status(200).send({ status: 200, product, success: true });
};

export { getAllProducts, createProduct, showProductById };
