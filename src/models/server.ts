import express, { Application } from 'express';
import cors from 'cors';

import { DEFAULT_PORT } from '@constants/port';
import { IPath } from '@interfaces/path';

import authRoute from '@routes/auth';

class Server {
  app: Application;
  PORT: string;
  apiPaths: IPath;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || DEFAULT_PORT;
    this.apiPaths = {
      auth: '/api/auth'
    };

    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.app.use(cors());

    this.app.use(express.json());
  }

  routes(): void {
    this.app.use(this.apiPaths.auth, authRoute);
  }

  listen(): void {
    this.app.listen(this.PORT, () => {
      console.log('Server running on the port: ' + this.PORT);
    });
  }
}

export default Server;
