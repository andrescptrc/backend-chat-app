import { Router } from 'express';

import { deleteUserTest } from '@controllers/user';

const router = Router();

router.delete('/test/:email', deleteUserTest);

export default router;
