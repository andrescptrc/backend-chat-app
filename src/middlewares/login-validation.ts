import { NextFunction, Request, Response } from 'express';

import validateLogin from '@schemas/login-validator';
import { middlewareResponse } from '@helpers';
import { HTTP_STATUS_CODES } from '@constants/http-status-codes';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;

  const { error } = validateLogin(user);

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

export default loginValidation;
