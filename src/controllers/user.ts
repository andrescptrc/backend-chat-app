import { Request, Response } from 'express';

import prisma from '@lib/prisma-client';
import { HTTP_STATUS_CODES } from '@constants/http-status-codes';
import generateResponse from '@helpers/generate-response';

export const deleteUserTest = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    await prisma.user.delete({
      where: {
        email
      }
    });

    return generateResponse({}, HTTP_STATUS_CODES.OK, res, undefined);
  } catch (error) {
    return generateResponse(
      undefined,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      res,
      ['Internal Server Error']
    );
  }
};
