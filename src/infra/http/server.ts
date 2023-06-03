import express from 'express';
import 'express-async-errors';
import { router } from './routes';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(router);

app.use(errorMiddleware);

app.listen(process.env.PORT || 6060, () => {
  console.log('Server in running... 🚀🚀');
});

export default app;
