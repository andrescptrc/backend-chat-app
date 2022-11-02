import { IRequestStatus } from '@interfaces/middlewares-test';
import { Request, Response } from 'express';

import { post } from '@helpers/petitions-test';

describe('Auth Controller', () => {
  let userData;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    userData = {};
    mockRequest = {};
    mockResponse = {};

    mockResponse.status = jest.fn(
      () => mockResponse
    ) as unknown as IRequestStatus;
    mockResponse.json = jest.fn();
  });

  it('Should return a ok response with correct email and password', async () => {
    userData = {
      email: 'test1@test.com',
      password: '12345678'
    };

    const res = await post('/api/auth/login', userData);

    expect(res.status).toBe(200);
    expect(res.body.response).toBe('ok');
  });
});
