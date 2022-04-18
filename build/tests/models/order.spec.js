"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../../models/order.model");
const product_model_1 = require("../../models/product.model");
const user_model_1 = require("../../models/user.model");
let order;
describe('Product Model', () => {
    beforeAll(async () => {
        const user = await user_model_1.UserModel.create({
            email: 'test@test.com',
            first_name: 'test',
            last_name: 'test',
            password: 'test123',
        });
        const product = await product_model_1.ProductModel.create({
            name: 'iphone13',
            price: 14000,
            category: 'phones',
        });
        order = {
            products: [
                {
                    product_id: product.id,
                    quantity: 5,
                },
            ],
            user_id: user.id,
        };
    });
    it('index method test', () => {
        expect(order_model_1.OrderModel.index).toBeDefined();
    });
    it('show method test', () => {
        expect(order_model_1.OrderModel.show).toBeDefined();
    });
    it('create method test', () => {
        expect(order_model_1.OrderModel.create).toBeDefined();
    });
    it('Insert order', async () => {
        const newOrder = await order_model_1.OrderModel.create(order);
        expect(newOrder).toBeDefined();
    });
    it('return all orders', async () => {
        const orders = await order_model_1.OrderModel.index(String(order.user_id));
        expect(orders).toBeDefined();
    });
    it('return specific order', async () => {
        const specificOrder = await order_model_1.OrderModel.show('1');
        expect(specificOrder).toBeDefined();
    });
});
