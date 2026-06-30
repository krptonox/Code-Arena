import { signUpUser } from '../Controllers/auth.controller.js';
import { verifyEmail } from '../Controllers/auth.controller.js';

import { Router } from 'express';

const router = Router();

router.route('/signup').post(signUpUser);

router.route('/verify-email/:token').get(verifyEmail);

export default router;
