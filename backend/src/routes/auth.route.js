import { signUpUser } from "../Controllers/auth.controller";

import {Router} from 'express';

const router = Router();

router.route('/signup').get(signUpUser)

export default router;