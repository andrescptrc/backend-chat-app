import { IsString, IsEmail, validateSync } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';

import { generateResponseMiddleware } from '@helpers/generate-response';

class LoginValues {
  @IsString({ message: 'The email must be a string' })
  @IsEmail(undefined, { message: 'The email is not valid' })
  email: string;

  @IsString({ message: 'The password must be a string' })
  password: string;
}

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;

  const login = plainToClass(LoginValues, user, {
    enableImplicitConversion: true
  });

  const errors = validateSync(login, { skipMissingProperties: false });

  if (errors.length > 0) {
    const response = generateResponseMiddleware(undefined, errors);
    return res.status(404).json(response);
  }

  next();
};

export default validateLogin;
