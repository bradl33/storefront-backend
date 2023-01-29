import app from '../../server';
import supertest from 'supertest';
import { OrderItems } from '../../models/order';
import { tokenize } from '../token';

const request = supertest(app);

describe('Order endpoint', (): void => {
  it('POST /orders/create', async (): Promise<void> => {
    const token = tokenize;

    const orderItems: OrderItems[] = [
      {
        product_id: 2,
        quantity: 22
      },
      {
        product_id: 1,
        quantity: 11
      }
    ];

    const response = await request
      .post('/orders/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ orderItems });

    expect(response.status).toBe(200);
  });

  it('GET /orders/active/1', async (): Promise<void> => {
    const token = tokenize;

    const response = await request
      .get('/orders/active/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('GET /orders/completed/1', async (): Promise<void> => {
    const token = tokenize;

    const response = await request
      .get('/orders/completed/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
