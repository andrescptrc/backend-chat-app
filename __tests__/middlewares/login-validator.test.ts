import validateLogin from '@middlewares/login-validator';
import { NextFunction, Request, Response } from 'express';

describe('Middleware Login Validator', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn()
    };
  });

  it('Should return an error by given an incorrect email', () => {
    const expectedResponse = {
      response: 'fail',
      data: {},
      errors: ['The email is not valid']
    };

    validateLogin(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });
});
