import { IRequestStatus } from '@interfaces/middlewares-test';
import { NextFunction, Request, Response } from 'express';

import { registerValidation } from '@middlewares';

describe('Middleware Register Validator', () => {
  let userData;
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

  it('Should the next function by called by given an correct data', async () => {
    userData = {
      name: 'Brayan',
      email: 'test1@test.com',
      password: '12345678',
      phone_number: '+573125681362'
    };

    mockRequest = {
      body: {
        ...userData
      }
    };

    registerValidation(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  it('Should return an error by given no data', async () => {
    const expectedResponse = {
      response: 'fail',
      data: {},
      errors: [
        'The name is required.',
        'The email is required.',
        'The password is required.'
      ]
    };

    userData = {};

    mockRequest = {
      body: {
        ...userData
      }
    };

    registerValidation(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('Should return an error by given empty properties', async () => {
    const expectedResponse = {
      response: 'fail',
      data: {},
      errors: [
        'The name must not be empty.',
        'The email must not be empty.',
        'The password must not be empty.',
        'The phone_number must not be empty.'
      ]
    };

    userData = {
      name: '',
      email: '',
      password: '',
      phone_number: ''
    };

    mockRequest = {
      body: {
        ...userData
      }
    };

    registerValidation(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('Should return an error by given incorrect data at minimun and email', async () => {
    const expectedResponse = {
      response: 'fail',
      data: {},
      errors: [
        'The name must have at least 3 characters at minimum.',
        'The email is not valid.',
        'The password must have at least 8 characters.',
        'The phone_number must have at least 8 characters.'
      ]
    };

    userData = {
      name: 'Br',
      email: 'test1test.com',
      password: '1234567',
      phone_number: '+573125'
    };
    mockRequest = {
      body: {
        ...userData
      }
    };

    registerValidation(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('Should return an error by given incorrect data at maximum', async () => {
    const expectedResponse = {
      response: 'fail',
      data: {},
      errors: [
        'The name must have 56 characters at maximun.',
        'The password must not exceed the 16 characters.',
        'The phone_number must not exceed the 16 characters.'
      ]
    };

    userData = {
      name: 'Brayan Andrés Carreño Perez Del Rincon',
      email: 'test1@test.com',
      password: '1234567891818181818',
      phone_number: '+57312523232323233'
    };
    mockRequest = {
      body: {
        ...userData
      }
    };

    registerValidation(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });
});
