import { NextFunction, Request, Response } from 'express';

import { generateResponseMiddleware } from '@helpers/generate-response';

import validateLogin from '@schemas/login-validator';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body || {};

  const { error } = validateLogin(user);

  if (error) {
    const response = generateResponseMiddleware(undefined, error);
    return res.status(404).json(response);
  }

  next();
};

export default loginValidation;
