import { Response } from 'express';

import { ValidationError } from 'joi';

import generateErrorString from './generate-error-string';

export const middlewareResponse = (
  data: unknown,
  statusCode: number,
  res: Response,
  errors: ValidationError | undefined
) => {
  if (!data && errors) {
    return res.status(statusCode).json({
      response: 'fail',
      data: {},
      errors: generateErrorString(errors)
    });
  }

  return res.status(statusCode).json({
    response: 'ok',
    data,
    errors: []
  });
};

export default middlewareResponse;
