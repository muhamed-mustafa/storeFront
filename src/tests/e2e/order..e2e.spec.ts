import request from 'supertest';
import app from '../../index';
import { OrderAttrs } from '../../models/order.model';

let order: OrderAttrs;
let user = { id: '', token: '' };

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

beforeAll(async () => {
  const { email, first_name, last_name, password } = newUser;
  const res = await request(app).post('/users').send({
    first_name,
    last_name,
    email,
    password,
  });
  user = { token: res.body.token, id: res.body.user.id };

  const { name, price, category } = newProduct;
  const res1 = await request(app)
    .post('/product')
    .set('Authorization', user.token)
    .send({
      name,
      price,
      category,
    });

  order = {
    products: [
      {
        product_id: res1.body.product.id,
        quantity: 5,
      },
    ],
    user_id: res.body.user.id,
  };
});

describe('Order Route Test', () => {
  it('create order', async () => {
    const res = await request(app)
      .post('/order')
      .set('Authorization', user.token)
      .send(order)
      .expect(201);

    expect(res.body.order).toBeDefined();
    expect(res.body.success).toBeTrue();
  });

  it('find order by id', async () => {
    const res = await request(app)
      .get('/order/1')
      .set('Authorization', user.token)
      .expect(200);

    expect(res.body.success).toBeTrue();
    expect(res.body.order).toBeDefined();
  });

  it('show all orders', async () => {
    const res = await request(app)
      .get(`/orders/${user.id}`)
      .set('Authorization', user.token)
      .expect(200);

    expect(res.body.success).toBeTrue();
    expect(res.body.orders).toBeDefined();
  });
});
