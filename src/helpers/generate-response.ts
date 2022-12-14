import { Response } from 'express';

const generateResponse = (
  data: unknown,
  statusCode: number,
  res: Response,
  errors: string[] | undefined
) => {
  if (!data && errors) {
    return res.status(statusCode).json({
      response: 'fail',
      data: {},
      errors
    });
  }

  return res.status(statusCode).json({
    response: 'ok',
    data,
    errors: []
  });
};

export default generateResponse;
