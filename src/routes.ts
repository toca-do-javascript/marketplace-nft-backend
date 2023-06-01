import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    Message: 'Hello Word',
  });
});

export { router };
