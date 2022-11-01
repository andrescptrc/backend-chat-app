import { Response } from 'express';

export type IRequestStatus = (
  code: number
) => Response<any, Record<string, any>>;

export type IUserData =
  | {
      email: string;
      password: string;
    }
  | {
      email: number;
      password: number;
    }
  | {};
