import { Response } from 'express';

export type IRequestStatus = (
  code: number
) => Response<any, Record<string, any>>;
