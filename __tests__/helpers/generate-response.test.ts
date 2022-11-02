import { Response } from 'express';
import { ValidationError } from 'joi';

import { HTTP_STATUS_CODES } from '@constants/http-status-codes';
import { IRequestStatus } from '@interfaces/middlewares-test';

import generateResponse from '@helpers/generate-response';
import generateErrorString from '@helpers/generate-error-string';
import middlewareResponse from '@helpers/middleware-response';

describe('Generate Response', () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {};

    mockResponse.status = jest.fn(
      () => mockResponse
    ) as unknown as IRequestStatus;
    mockResponse.json = jest.fn();
  });

  it('Should generate a failed response with the given message', () => {
    const responseFailed = {
      response: 'fail',
      data: {},
      errors: ['Internal Server Error']
    };

    generateResponse(
      undefined,
      HTTP_STATUS_CODES.BAD_REQUEST,
      mockResponse as Response,
      ['Internal Server Error']
    );

    expect(mockResponse.json).toHaveBeenCalledWith(responseFailed);
  });

  it('Should generate a success response with the given message', () => {
    const data = { name: 'hi!' };
    const responseSuccess = {
      response: 'ok',
      data,
      errors: []
    };

    generateResponse(
      data,
      HTTP_STATUS_CODES.OK,
      mockResponse as Response,
      undefined
    );

    expect(mockResponse.json).toHaveBeenCalledWith(responseSuccess);
  });

  it('Should generate an array of strings with the given errors', () => {
    const emailError = 'The email is not valid';

    const validationError = {
      details: [{ message: emailError }]
    } as Partial<ValidationError>;

    const errorArray = generateErrorString(validationError as ValidationError);

    expect(errorArray[0]).toBe(emailError);
  });

  it('Should geneate a middleware failed response with the given errors', () => {
    const emailError = 'The email is not valid';

    const responseFailed = {
      response: 'fail',
      data: {},
      errors: [emailError]
    };

    const validationError = {
      details: [{ message: emailError }]
    } as Partial<ValidationError>;

    middlewareResponse(
      undefined,
      HTTP_STATUS_CODES.NOT_FOUND,
      mockResponse as Response,
      validationError as ValidationError
    );

    expect(mockResponse.json).toHaveBeenCalledWith(responseFailed);
  });

  it('Should geneate a middleware success response with the given data', () => {
    const data = { name: 'hi!' };

    const reponseSuccess = {
      response: 'ok',
      data,
      errors: []
    };

    middlewareResponse(
      data,
      HTTP_STATUS_CODES.OK,
      mockResponse as Response,
      undefined
    );

    expect(mockResponse.json).toHaveBeenCalledWith(reponseSuccess);
  });
});
