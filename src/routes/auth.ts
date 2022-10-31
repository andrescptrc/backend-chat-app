import { Router } from 'express';

import { login, register } from '@controllers/auth';

import loginValidation from '@middlewares/login-validation';
import registerValidation from '@middlewares/register-validator';

const router = Router();

router.post('/login', loginValidation, login);

router.post('/register', registerValidation, register);

export default router;
