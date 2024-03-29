import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import prisma from '@lib/prisma-client';
import { HTTP_STATUS_CODES } from '@constants/http-status-codes';
import generateResponse from '@helpers/generate-response';

const JWT_KEY = process.env.JWT_KEY || '';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;

  if (!token) {
    return generateResponse(undefined, HTTP_STATUS_CODES.UNAUTHORIZED, res, [
      'The token is required'
    ]);
  }

  try {
    const { uid } = jwt.verify(token, JWT_KEY) as IJWTPayload;

    const user = await prisma.user.findUnique({
      where: {
        uid
      }
    });

    if (!user) {
      return generateResponse(undefined, HTTP_STATUS_CODES.UNAUTHORIZED, res, [
        "The token is not valid - the user doesn't exist"
      ]);
    }

    if (!user.state) {
      return generateResponse(undefined, HTTP_STATUS_CODES.UNAUTHORIZED, res, [
        'The token is not valid - the user is deleted'
      ]);
    }

    const { password, ...rest } = user;

    req.user = rest;
    req.token = token;

    next();
  } catch (error) {
    return generateResponse(undefined, HTTP_STATUS_CODES.UNAUTHORIZED, res, [
      'The token expired.'
    ]);
  }
};

type IJWTPayload = {
  uid: string;
  iat: number;
  exp: number;
};

export default validateJWT;
