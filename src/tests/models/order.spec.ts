import { OrderModel, OrderAttrs } from '../../models/order.model';
import { ProductModel } from '../../models/product.model';
import { UserModel } from '../../models/user.model';

let order: OrderAttrs;

describe('Product Model', () => {
  beforeAll(async () => {
    const user = await UserModel.create({
      email: 'test@test.com',
      first_name: 'test',
      last_name: 'test',
      password: 'test123',
    });

    const product = await ProductModel.create({
      name: 'iphone13',
      price: 14000,
      category: 'phones',
    });

    order = {
      products: [
        {
          product_id: product.id as unknown as number,
          quantity: 5,
        },
      ],
      user_id: user.id as unknown as number,
    };
  });

  it('index method test', () => {
    expect(OrderModel.index).toBeDefined();
  });

  it('show method test', () => {
    expect(OrderModel.show).toBeDefined();
  });

  it('create method test', () => {
    expect(OrderModel.create).toBeDefined();
  });

  it('Insert order', async () => {
    const newOrder = await OrderModel.create(order);
    expect(newOrder).toBeDefined();
  });

  it('return all orders', async () => {
    const orders = await OrderModel.index(String(order.user_id));
    expect(orders).toBeDefined();
  });

  it('return specific order', async () => {
    const specificOrder = await OrderModel.show('1');
    expect(specificOrder).toBeDefined();
  });
});
