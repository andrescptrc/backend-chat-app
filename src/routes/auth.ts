import { Router } from 'express';

import { currentUser, login, register } from '@controllers/auth';
import { loginValidation, registerValidation, validateJWT } from '@middlewares';

const router = Router();

router.post('/login', loginValidation, login);

router.post('/register', registerValidation, register);

router.get('/current', validateJWT, currentUser);

export default router;
