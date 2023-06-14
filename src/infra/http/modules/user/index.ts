/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import prismaClient from '../../../database/prisma/client';
import UserController from './user.controller';
import UserService from './user.service';
import authenticatedUserMiddleware from '../../middlewares/authenticated-user.middleware';

const userService = new UserService(prismaClient);
const userController = new UserController(userService);

const router = Router();

router.post('/', (req, res) => userController.create(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.put('/', authenticatedUserMiddleware, (req, res) =>
  userController.edit(req, res)
);

export default router;
