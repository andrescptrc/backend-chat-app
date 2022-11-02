import req from 'supertest';

import Server from '@models/server';

const server = new Server();

const app = server.app;

export const post = async (url: string, data: object): Promise<req.Test> => {
  return await req(app).post(url).send(data);
};

export const get = async (url: string, token: string): Promise<req.Test> => {
  return await req(app).get(url).set('authorization', token);
};

export const put = async (
  url: string,
  data: object,
  token: string
): Promise<req.Test> => {
  return await req(app).put(url).send(data).set('authorization', token);
};
