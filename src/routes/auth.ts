import { Router } from 'express';

import { login, register } from '@controllers/auth';
import validateLogin from '@middlewares/login-validator';

const router = Router();

router.post('/login', validateLogin, login);

router.post('/register', register);

export default router;
