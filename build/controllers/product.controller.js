"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showProductById = exports.createProduct = exports.getAllProducts = void 0;
const product_model_1 = require("../models/product.model");
const getAllProducts = async (req, res) => {
    const products = await product_model_1.ProductModel.index();
    res.status(200).send({ status: 200, products, success: true });
};
exports.getAllProducts = getAllProducts;
const createProduct = async (req, res) => {
    const product = await product_model_1.ProductModel.create({ ...req.body });
    res.status(201).send({ status: 201, product, success: true });
};
exports.createProduct = createProduct;
const showProductById = async (req, res) => {
    const product = await product_model_1.ProductModel.show(Number(req.params.id));
    if (!product) {
        return res
            .status(404)
            .send({ status: 404, message: 'Product Not Found', success: false });
    }
    res.status(200).send({ status: 200, product, success: true });
};
exports.showProductById = showProductById;
