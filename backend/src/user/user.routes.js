import { Router } from 'express';

import * as UserController from './user.controller'
import { isAuthenticated } from '../middlewares'

const router = Router();

router.get('/users', UserController.getUsers);
router.patch('/user/:id', isAuthenticated, UserController.updateUser);
router.delete('/user/:id', isAuthenticated, UserController.deleteUser);

export { router as userRoutes };
