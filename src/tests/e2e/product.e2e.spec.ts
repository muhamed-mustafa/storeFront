import request from 'supertest';
import app from '../../index';

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

let userToken: string;
beforeAll(async () => {
  const { email, first_name, last_name, password } = newUser;
  const res = await request(app).post('/users').send({
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
    const res = await request(app)
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
    const res = await request(app)
      .get('/product/1')
      .set('Authorization', userToken)
      .expect(200);

    expect(res.body.success).toBeTrue();
    expect(res.body.product.price).toEqual(14000);
  });

  it('show all products', async () => {
    const res = await request(app)
      .get('/product')
      .set('Authorization', userToken)
      .expect(200);

    expect(res.body.success).toBeTrue();
    expect(res.body.products).toBeDefined();
  });
});
