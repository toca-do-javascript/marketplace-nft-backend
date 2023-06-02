import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserControllers';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    Message: 'Hello Word',
  });
});

router.post('/create/user', new CreateUserController().handle);

export { router };
