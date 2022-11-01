import { NextFunction, Request, Response } from 'express';

import validateRegister from '@schemas/register-validator';
import { middlewareResponse } from '@helpers';
import { HTTP_STATUS_CODES } from '@constants/http-status-codes';

const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;

  const { error } = validateRegister(user);

  if (error) {
    return middlewareResponse(
      undefined,
      HTTP_STATUS_CODES.BAD_REQUEST,
      res,
      error
    );
  }

  next();
};

export default registerValidation;
