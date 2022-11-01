import { NextFunction, Request, Response } from 'express';

import { generateResponseMiddleware } from '@helpers/generate-response';

import validateRegister from '@schemas/register-validator';

const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;

  const { error } = validateRegister(user);

  if (error) {
    const response = generateResponseMiddleware(undefined, error);
    return res.status(404).json(response);
  }

  next();
};

export default registerValidation;
