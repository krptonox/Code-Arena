import { signUpUser } from '../Controllers/auth.controller.js';
import { verifyEmail } from '../Controllers/auth.controller.js';
import { loginUser } from '../Controllers/auth.controller.js';
import { logoutUser } from '../Controllers/auth.controller.js';

import { getCurrentUser } from '../Controllers/auth.controller.js'

import { resendEmailVerification } from '../Controllers/auth.controller.js'

import { Router } from 'express';

import { verifyJwt } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/signup').post(signUpUser);

router.route('/verify-email/:token').get(verifyEmail);

router.route('/login').post(loginUser);



//secure routes for registered users only

router.route('/logout').post(verifyJwt, logoutUser)

router.route('/currentUser').get(verifyJwt, getCurrentUser)

router.route('/resend-email-verification').post(verifyJwt, resendEmailVerification)


export default router;
