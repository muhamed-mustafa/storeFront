"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
const newUser = {
    email: 'test@test.com',
    first_name: 'test',
    last_name: 'test',
    password: 'test123',
};
describe('User Model', () => {
    it('index method test', () => {
        expect(user_model_1.UserModel.index).toBeDefined();
    });
    it('show method test', () => {
        expect(user_model_1.UserModel.show).toBeDefined();
    });
    it('create method test', () => {
        expect(user_model_1.UserModel.create).toBeDefined();
    });
    it('Insert user', async () => {
        const user = await user_model_1.UserModel.create(newUser);
        expect(user.email).toEqual(newUser.email);
    });
    it('return all users', async () => {
        const users = await user_model_1.UserModel.index();
        expect(users).toBeDefined();
    });
    it('return specific user', async () => {
        const user = await user_model_1.UserModel.show(1);
        expect(user).toBeDefined();
    });
});
