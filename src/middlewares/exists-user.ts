import { NextFunction, Request, Response } from 'express';

import prisma from '@lib/prisma-client';
import { HTTP_STATUS_CODES } from '@constants/http-status-codes';
import generateResponse from '@helpers/generate-response';

export const existUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      uid
    }
  });

  if (!user) {
    return generateResponse(undefined, HTTP_STATUS_CODES.NOT_FOUND, res, [
      "The user doesn't exist."
    ]);
  }

  next();
};
