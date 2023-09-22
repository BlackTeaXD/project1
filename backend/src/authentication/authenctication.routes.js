import { Router } from 'express';
import * as AuthenticationController from './authentication.controller'

const router = Router();

router.post('/sign-up', AuthenticationController.signUp);
router.post('/sign-in', AuthenticationController.signIn);

export { router as authenticationRoutes };
