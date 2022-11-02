import { Router } from 'express';

import { currentUser, login, register } from '@controllers/auth';

import loginValidation from '@middlewares/login-validation';
import registerValidation from '@middlewares/register-validation';
import validateJWT from '@middlewares/validate-jwt';

const router = Router();

router.post('/login', loginValidation, login);

router.post('/register', registerValidation, register);

router.get('/current', validateJWT, currentUser);

export default router;
