import { Request, Response } from 'express';

import prisma from '@lib/prisma-client';

import * as argon2 from 'argon2';
import generateJWT from '@helpers/generate-jwt';
import { generateResponseController } from '@helpers/generate-response';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(404).json({
        msg: "The user doesn't exist"
      });
    }

    if (!user.state) {
      return res.status(404).json({
        msg: 'The user is deleted. If you want to recover it, contact with support'
      });
    }

    const verifyPassword = await argon2.verify(user.password, password);

    if (!verifyPassword) {
      const response = generateResponseController(undefined, [
        'The email or password are incorrect'
      ]);

      return res.status(404).json(response);
    }

    const token = await generateJWT(user.uid);

    const response = generateResponseController({ token }, undefined);

    res.status(200).json(response);
  } catch (error) {
    const response = generateResponseController(undefined, [
      'Internal Server Error'
    ]);

    res.status(500).json(response);
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
      const response = generateResponseController(undefined, [
        'The user already exist'
      ]);

      return res.status(404).json(response);
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
    const dataResponse = {
      user,
      token
    };
    const response = generateResponseController(dataResponse, undefined);

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      msg: 'Internal Server Error'
    });
  }
};
