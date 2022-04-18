"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../../models/product.model");
const newProduct = {
    name: 'iphone13',
    price: 14000,
    category: 'phones',
};
describe('Product Model', () => {
    it('index method test', () => {
        expect(product_model_1.ProductModel.index).toBeDefined();
    });
    it('show method test', () => {
        expect(product_model_1.ProductModel.show).toBeDefined();
    });
    it('create method test', () => {
        expect(product_model_1.ProductModel.create).toBeDefined();
    });
    it('Insert product', async () => {
        const product = await product_model_1.ProductModel.create(newProduct);
        expect(+product.price).toEqual(newProduct.price);
    });
    it('return all products', async () => {
        const products = await product_model_1.ProductModel.index();
        expect(products).toBeDefined();
    });
    it('return specific product', async () => {
        const product = await product_model_1.ProductModel.show(1);
        expect(product).toBeDefined();
    });
});
