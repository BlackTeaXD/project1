import { Router } from 'express';

import { authenticationRoutes } from './authenctication.routes';

const router = Router();

router.use('/', authenticationRoutes);

export { router as authenticationRouter };
