import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product model', (): void => {
  it('has createProduct method', (): void => {
    expect(store.createProduct).toBeDefined();
  });

  it('has getOneProductById method', (): void => {
    expect(store.getOneProductById).toBeDefined();
  });

  it('has getProductsByCat method', (): void => {
    expect(store.getProductsByCat).toBeDefined();
  });

  it('has getAllProducts method', (): void => {
    expect(store.getAllProducts).toBeDefined();
  });

  it('has deleteProduct method', (): void => {
    expect(store.deleteProduct).toBeDefined();
  });

  it('create product method adds a product', async (): Promise<void> => {
    const result = await store.createProduct({
      name: 'Samsung TV 50-inch',
      price: 50000,
      category: 'TVs'
    });

    expect(result).toEqual({
      name: 'Samsung TV 50-inch',
      price: 50000,
      category: 'TVs'
    });
  });

  it('getProductById method returns product by id', async (): Promise<void> => {
    const result = await store.getOneProductById(1);

    expect(result).toEqual({
      name: 'Galaxy OrderSpec',
      price: 20000,
      category: 'phones'
    });
  });

  it('getProductByCat method returns products by category', async (): Promise<void> => {
    const result = await store.getProductsByCat('TVs');

    expect(result).toEqual([
      {
        name: 'Samsung TV 50-inch',
        price: 50000,
        category: 'TVs'
      }
    ]);
  });

  it('getAllProducts method returns all products', async (): Promise<void> => {
    const result = await store.getAllProducts();

    expect(result).toEqual([
      {
        name: 'Galaxy OrderSpec',
        price: 20000,
        category: 'phones'
      },
      {
        name: 'Samsung TV 50-inch',
        price: 50000,
        category: 'TVs'
      }
    ]);
  });

  // it('deleteProduct method deletes product by id', async (): Promise<void> => {
  //   const result = await store.deleteProduct(1);
  //   expect(result).toBeTrue;
  // });
});
