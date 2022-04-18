"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
let userToken;
const newUser = {
    email: 'test@test.com',
    first_name: 'test',
    last_name: 'test',
    password: 'test123',
};
describe('User Route Test', () => {
    it('create user', async () => {
        const { email, first_name, last_name, password } = newUser;
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/users')
            .send({
            first_name,
            last_name,
            email,
            password,
        })
            .expect(201);
        userToken = res.body.token;
        expect(res.body.user.email).toEqual('test@test.com');
    });
    it('find user by id', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .get('/users/1')
            .set('Authorization', userToken)
            .expect(200);
        expect(res.body.success).toBeTrue();
        expect(res.body.user.email).toEqual('test@test.com');
    });
    it('show all users', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .get('/users')
            .set('Authorization', userToken)
            .expect(200);
        expect(res.body.success).toBeTrue();
        expect(res.body.users).toBeDefined();
    });
});
