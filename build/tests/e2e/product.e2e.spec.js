"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const newUser = {
    email: 'test@test.com',
    first_name: 'test',
    last_name: 'test',
    password: 'test123',
};
const newProduct = {
    name: 'iphone13',
    price: 14000,
    category: 'phones',
};
let userToken;
beforeAll(async () => {
    const { email, first_name, last_name, password } = newUser;
    const res = await (0, supertest_1.default)(index_1.default).post('/users').send({
        first_name,
        last_name,
        email,
        password,
    });
    userToken = res.body.token;
});
describe('Product Route Test', () => {
    it('create product', async () => {
        const { name, price, category } = newProduct;
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/product')
            .set('Authorization', userToken)
            .send({
            name,
            price,
            category,
        })
            .expect(201);
        expect(res.body.success).toBeTrue();
        expect(res.body.product.price).toEqual(14000);
    });
    it('find product by id', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .get('/product/1')
            .set('Authorization', userToken)
            .expect(200);
        expect(res.body.success).toBeTrue();
        expect(res.body.product.price).toEqual(14000);
    });
    it('show all products', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .get('/product')
            .set('Authorization', userToken)
            .expect(200);
        expect(res.body.success).toBeTrue();
        expect(res.body.products).toBeDefined();
    });
});
