import { UserModel } from '../../models/user.model';
const newUser = {
  email: 'test@test.com',
  first_name: 'test',
  last_name: 'test',
  password: 'test123',
};

describe('User Model', () => {
  it('index method test', () => {
    expect(UserModel.index).toBeDefined();
  });

  it('show method test', () => {
    expect(UserModel.show).toBeDefined();
  });

  it('create method test', () => {
    expect(UserModel.create).toBeDefined();
  });

  it('Insert user', async () => {
    const user = await UserModel.create(newUser);
    expect(user.email).toEqual(newUser.email);
  });

  it('return all users', async () => {
    const users = await UserModel.index();
    expect(users).toBeDefined();
  });

  it('return specific user', async () => {
    const user = await UserModel.show(1);
    expect(user).toBeDefined();
  });
});
