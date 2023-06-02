/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import prismaClient from '../../../database/prisma/client';
import UserController from './user.controller';
import UserService from './user.service';

const userService = new UserService(prismaClient);
const userController = new UserController(userService);

const router = Router();

router.post('/', (req, res) => userController.create(req, res));

export default router;
