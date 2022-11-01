import { generateResponseController } from '@helpers/generate-response';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import prisma from '@lib/prisma-client';

const JWT_KEY = process.env.JWT_KEY || '';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    const response = generateResponseController(undefined, [
      'The token is required'
    ]);

    return res.status(401).json(response);
  }

  try {
    const { uid } = jwt.verify(token, JWT_KEY) as IJWTPayload;

    const user = await prisma.user.findUnique({
      where: {
        uid
      }
    });

    if (!user) {
      const response = generateResponseController(undefined, [
        "The token is not valid - the user doesn't exist"
      ]);

      return res.status(401).json(response);
    }

    if (!user.state) {
      const response = generateResponseController(undefined, [
        'The token is not valid - the user is deleted'
      ]);

      return res.status(401).json(response);
    }

    const { password, ...rest } = user;

    req.user = rest;

    next();
  } catch (error) {
    const response = generateResponseController(undefined, [
      'Internal Server Error'
    ]);
    res.status(500).json(response);
  }
};

type IJWTPayload = {
  uid: string;
  iat: number;
  exp: number;
};

export default validateJWT;
