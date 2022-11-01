import { ValidationError } from 'joi';

import {
  generateErrorString,
  generateResponseController,
  generateResponseMiddleware
} from '@helpers/generate-response';

describe('Generate Response', () => {
  it('Should generate a failed response with the given message', () => {
    const responseFailed = {
      response: 'fail',
      data: {},
      errors: ['Internal Server Error']
    };

    const messageGenerated = generateResponseController(undefined, [
      'Internal Server Error'
    ]);

    expect(messageGenerated).toStrictEqual(responseFailed);
  });

  it('Should generate a success response with the given message', () => {
    const data = { name: 'hi!' };
    const responseSuccess = {
      response: 'ok',
      data,
      errors: []
    };

    const messageGenerated = generateResponseController(data, undefined);

    expect(messageGenerated).toStrictEqual(responseSuccess);
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

    const messageGenerated = generateResponseMiddleware(
      undefined,
      validationError as ValidationError
    );

    expect(messageGenerated).toStrictEqual(responseFailed);
  });

  it('Should geneate a middleware success response with the given data', () => {
    const data = { name: 'hi!' };

    const reponseSuccess = {
      response: 'ok',
      data,
      errors: []
    };

    const messageGenerated = generateResponseMiddleware(data, undefined);

    expect(messageGenerated).toStrictEqual(reponseSuccess);
  });
});
