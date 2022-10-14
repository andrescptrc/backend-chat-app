import { Request, Response } from 'express';

import prisma from '@lib/prisma-client';

import * as argon2 from 'argon2';
import generateJWT from '@helpers/generate-jwt';

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

    const verifyPassword = argon2.verify(user.password, password);

    if (!verifyPassword) {
      return res.status(404).json({
        msg: 'Incorrect email or password'
      });
    }

    const token = await generateJWT(user.uid);

    res.status(200).json({
      token
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Internal Server Error'
    });
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
      return res.status(404).json({
        msg: 'The user already exist'
      });
    }

    const newUser = {
      name,
      email,
      password,
      phone_number
    };

    const user = await prisma.user.create({
      data: newUser
    });

    const token = await generateJWT(user.uid);

    res.status(201).json({
      user,
      token
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Internal Server Error'
    });
  }
};
