import { signUpUser } from '../Controllers/auth.controller.js';

import { Router } from 'express';

const router = Router();

router.route('/signup').get(signUpUser);

export default router;
