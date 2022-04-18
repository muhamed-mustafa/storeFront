import { ProductModel } from '../../models/product.model';
const newProduct = {
  name: 'iphone13',
  price: 14000,
  category: 'phones',
};

describe('Product Model', () => {
  it('index method test', () => {
    expect(ProductModel.index).toBeDefined();
  });

  it('show method test', () => {
    expect(ProductModel.show).toBeDefined();
  });

  it('create method test', () => {
    expect(ProductModel.create).toBeDefined();
  });

  it('Insert product', async () => {
    const product = await ProductModel.create(newProduct);
    expect(+product.price).toEqual(newProduct.price);
  });

  it('return all products', async () => {
    const products = await ProductModel.index();
    expect(products).toBeDefined();
  });

  it('return specific product', async () => {
    const product = await ProductModel.show(1);
    expect(product).toBeDefined();
  });
});
