import { NextFunction, Request, Response } from 'express';

import { plainToClass } from 'class-transformer';
import { IsEmail, IsString, validateSync } from 'class-validator';

import { generateResponseMiddleware } from '@helpers/generate-response';

class RegisterValues {
  @IsString({ message: 'The name must be a string' })
  name: string;

  @IsString({ message: 'The email must be a string' })
  @IsEmail(undefined, { message: 'The email is not valid' })
  email: string;

  @IsString({ message: 'The password must be a string' })
  password: string;

  @IsString({ message: 'The phone_number must be a string' })
  phone_number: string;
}

const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;

  const register = plainToClass(RegisterValues, user, {
    enableImplicitConversion: true
  });

  const errors = validateSync(register, { skipMissingProperties: false });

  if (errors.length > 0) {
    const response = generateResponseMiddleware(undefined, errors);
    return res.status(404).json(response);
  }

  next()
};

export default validateRegister;
