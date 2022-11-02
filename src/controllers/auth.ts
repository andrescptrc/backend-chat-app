import { Request, Response } from 'express';

import prisma from '@lib/prisma-client';
import * as argon2 from 'argon2';

import { HTTP_STATUS_CODES } from '@constants/http-status-codes';

import generateJWT from '@helpers/generate-jwt';
import generateResponse from '@helpers/generate-response';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return generateResponse(undefined, HTTP_STATUS_CODES.NOT_FOUND, res, [
        "The user doesn't exist"
      ]);
    }

    if (!user.state) {
      return generateResponse(undefined, HTTP_STATUS_CODES.UNAUTHORIZED, res, [
        'The user is deleted. If you want to recover it, contact with support'
      ]);
    }

    const verifyPassword = await argon2.verify(user.password, password);

    if (!verifyPassword) {
      return generateResponse(undefined, HTTP_STATUS_CODES.BAD_REQUEST, res, [
        'The email or password are incorrect'
      ]);
    }

    const token = await generateJWT(user.uid);

    return generateResponse({ token }, HTTP_STATUS_CODES.OK, res, undefined);
  } catch (error) {
    return generateResponse(
      undefined,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      res,
      ['Internal Server Error']
    );
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, name, password, phone_number } = req.body;

  try {
    const userDB = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userDB) {
      return generateResponse(undefined, HTTP_STATUS_CODES.BAD_REQUEST, res, [
        'The user already exist'
      ]);
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone_number
    };

    const user = await prisma.user.create({
      data: newUser
    });

    const token = await generateJWT(user.uid);

    return generateResponse({ token }, HTTP_STATUS_CODES.OK, res, undefined);
  } catch (error) {
    return generateResponse(
      undefined,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      res,
      ['Internal Server Error']
    );
  }
};

export const currentUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    return generateResponse(user, HTTP_STATUS_CODES.OK, res, undefined);
  } catch (error) {
    return generateResponse(
      undefined,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      res,
      ['Internal Server Error']
    );
  }
};
