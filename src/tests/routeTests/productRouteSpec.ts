import app from '../../server';
import supertest from 'supertest';
import { tokenize } from '../token';

const request = supertest(app);

describe('Product endpoint', (): void => {
  it('POST /products/create', async (): Promise<void> => {
    const token = tokenize;

    const response = await request
      .post('/products/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'iPhone X',
        price: 70000,
        category: 'phones'
      });

    expect(response.status).toBe(201);
  });

  it('GET /products/1', async (): Promise<void> => {
    const token = tokenize;

    const response = await request
      .get('/products/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('GET /products/category/phones', async (): Promise<void> => {
    const token = tokenize;

    const response = await request
      .get('/products/category/phones')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('GET /products/', async (): Promise<void> => {
    const token = tokenize;

    const response = await request
      .get('/products/')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
