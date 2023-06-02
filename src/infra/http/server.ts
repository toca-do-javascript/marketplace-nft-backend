import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import 'express-async-errors';
import { router } from './routes';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(router);

// TRATANDO ERROS
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.sendStatus(500);
});

app.listen(process.env.PORT || 3333, () => {
  console.log('Server in running... 🚀🚀');
});

export default app;
