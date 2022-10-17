import dotenv from 'dotenv';
import 'reflect-metadata';

import Server from '@models/server';

dotenv.config();

const server = new Server();

server.listen();
