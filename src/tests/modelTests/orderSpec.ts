import { OrderStore, OrderUpdateType } from '../../models/order';
import { ProductStore } from '../../models/product';
import { UserStore } from '../../models/user';
import { OrderItems } from '../../models/order';

const u_store = new UserStore();
const p_store = new ProductStore();
const store = new OrderStore();

//based on alphabetical order, this spec runs first before productSpec and userSpec (o comes before p and u)
//therefore, productSpec and userSpec will test for existence of values submitted by orderSpec

describe('Order model', (): void => {
  it('has createOrderProducts method', (): void => {
    expect(store.createOrderProducts).toBeDefined();
  });

  it('has getUserActiveOrders method', (): void => {
    expect(store.getUserActiveOrders).toBeDefined();
  });

  it('has updateOrderStatus method', (): void => {
    expect(store.updateOrderStatus).toBeDefined();
  });

  it('has getUserCompletedOrders method', (): void => {
    expect(store.getUserCompletedOrders).toBeDefined();
  });

  it('has getUserAllOrders method', (): void => {
    expect(store.getUserAllOrders).toBeDefined();
  });

  it('has deleteOrder method', (): void => {
    expect(store.deleteOrder).toBeDefined();
  });

  it('createOrderProducts method creates an order', async (): Promise<void> => {
    //do not change username and password as they're used to generate token used throughout the tests
    await u_store.createUser({
      firstname: 'Jane',
      lastname: 'Doe OrderSpec',
      username: 'jane_doe',
      password: 'pass_jane'
    });

    await p_store.createProduct({
      name: 'Galaxy OrderSpec',
      price: 20000,
      category: 'phones'
    });

    const orderOwner = 1; //user id 1 is the owner of the order

    const orderItems: OrderItems[] = [
      {
        product_id: 1,
        quantity: 10
      }
    ];

    const result = await store.createOrderProducts(orderOwner, orderItems);

    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'active'
    });
  });

  it('getUserAllOrders method returns all orders by user id', async (): Promise<void> => {
    const result = await store.getUserAllOrders(1);

    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        status: 'active'
      }
    ]);
  });

  it('getUserActiveOrders method returns active orders by user id', async (): Promise<void> => {
    const result = await store.getUserActiveOrders(1);

    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        status: 'active'
      }
    ]);
  });

  it('updateOrderStatus method updates status of order by id', async (): Promise<void> => {
    const orderToUpdate: OrderUpdateType = {
      id: 1,
      status: 'completed'
    };

    await store.updateOrderStatus(orderToUpdate);
  });

  it('getUserCompletedOrders method returns completed orders by user id', async (): Promise<void> => {
    const result = await store.getUserCompletedOrders(1);
    expect(result).toBeTrue;
  });

  // it('deleteOrder method deleted order by id', async (): Promise<void> => {
  //   const result = await store.deleteOrder(1);
  //   expect(result).toEqual({
  //     id: 1,
  //     user_id: 1,
  //     status: 'completed'
  //   });
  // });
});
