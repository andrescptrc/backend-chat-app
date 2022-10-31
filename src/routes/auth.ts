import { Router } from 'express';

import { login, register } from '@controllers/auth';

import loginValidation from '@middlewares/login-validator';
import validateRegister from '@middlewares/register-validator';

const router = Router();

router.post('/login', loginValidation, login);

router.post('/register', validateRegister, register);

export default router;
