import { IRequestStatus } from '@interfaces/middlewares-test';
import { NextFunction, Request, Response } from 'express';

import loginValidation from '@middlewares/login-validation';

describe('Middleware Login Validator', () => {
  let userData: IUserData;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    userData = {};
    mockRequest = {};
    mockResponse = {};

    mockResponse.status = jest.fn(
      () => mockResponse
    ) as unknown as IRequestStatus;
    mockResponse.json = jest.fn();
  });

  it('Should the next function by called by given an correct email and and correct password', async () => {
    userData = {
      email: 'teste@test.com',
      password: '12345678'
    };

    mockRequest = {
      body: {
        ...userData
      }
    };

    loginValidation(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  it('Should return an error by given no email and and no password', async () => {
    const expectedResponse = {
      response: 'fail',
      data: {},
      errors: ['The email is required.', 'The password is required.']
    };

    userData = {};

    mockRequest = {
      body: {
        ...userData
      }
    };

    loginValidation(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('Should return an error by given an incorrect email and and incorrect password', async () => {
    const expectedResponse = {
      response: 'fail',
      data: {},
      errors: [
        'The email is not valid.',
        'The password must have at least 8 characters.'
      ]
    };

    userData = {
      email: 'teste@testcom',
      password: '1234567'
    };

    mockRequest = {
      body: {
        ...userData
      }
    };

    loginValidation(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('Should return an error by given a number email and a number password', async () => {
    const expectedResponse = {
      response: 'fail',
      data: {},
      errors: ['The email must be a string.', 'The password must be a string.']
    };

    userData = {
      email: 1111,
      password: 1111
    };

    mockRequest = {
      body: {
        ...userData
      }
    };

    loginValidation(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('Should return an error by a password that exceed the 16 characters', async () => {
    const expectedResponse = {
      response: 'fail',
      data: {},
      errors: ['The password must not exceed the 16 characters.']
    };

    userData = {
      email: 'test@test.com',
      password: '12345678912345678'
    };

    mockRequest = {
      body: {
        ...userData
      }
    };

    loginValidation(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('Should return an error by given an empty email and and empty password', async () => {
    const expectedResponse = {
      response: 'fail',
      data: {},
      errors: [
        'The email must not be empty.',
        'The password must not be empty.'
      ]
    };

    userData = {
      email: '',
      password: ''
    };

    mockRequest = {
      body: {
        ...userData
      }
    };

    loginValidation(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });
});

type IUserData =
  | {
      email: string;
      password: string;
    }
  | {
      email: number;
      password: number;
    }
  | {};
