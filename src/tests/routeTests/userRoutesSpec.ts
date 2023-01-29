import app from '../../server';
import supertest from 'supertest';
import { tokenize } from '../token';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('User endpoint', (): void => {
  it('GET /', async (): Promise<void> => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
  });

  it('POST /users/create', async (): Promise<void> => {
    const response = await request.post('/users/create').send({
      firstname: 'Jane',
      lastname: 'Doe UserRouteSpec',
      username: 'jane_doe',
      password: 'pass_jane'
    });

    expect(response.status).toBe(201);
  });

  it('POST /users/login', async (): Promise<void> => {
    const response = await request.post('/users/login').send({
      username: 'jane_doe',
      password: 'pass_jane'
    });

    expect(response.status).toBe(200);
  });

  it('GET /users/1', async (): Promise<void> => {
    const token = tokenize;

    const response = await request
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('GET /users', async (): Promise<void> => {
    const token = tokenize;

    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
