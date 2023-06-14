import { Router } from 'express';
// import { CreateUserController } from '../../controllers/CreateUserControllers';
import userModule from './modules/user';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    Message: 'Hello Word',
  });
});

router.use('/users', userModule);

export { router };
