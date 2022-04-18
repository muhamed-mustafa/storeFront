import request from 'supertest';
import app from '../../index';

let userToken: string;

const newUser = {
  email: 'test@test.com',
  first_name: 'test',
  last_name: 'test',
  password: 'test123',
};

describe('User Route Test', () => {
  it('create user', async () => {
    const { email, first_name, last_name, password } = newUser;
    const res = await request(app)
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
    const res = await request(app)
      .get('/users/1')
      .set('Authorization', userToken)
      .expect(200);

    expect(res.body.success).toBeTrue();
    expect(res.body.user.email).toEqual('test@test.com');
  });

  it('show all users', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', userToken)
      .expect(200);

    expect(res.body.success).toBeTrue();
    expect(res.body.users).toBeDefined();
  });
});
