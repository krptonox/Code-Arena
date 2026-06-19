import { signUpUser } from '../Controllers/auth.controller.js';

import { Router } from 'express';

const router = Router();

router.route('/signup').post(signUpUser);

export default router;
