import { type NextFunction, type Request, type Response } from 'express';
import HttpException from '../exceptions/http.exception';

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (err instanceof HttpException) {
    const parsedError = JSON.parse(err.message);

    return res.status(err.status).json(parsedError);
  }

  return res.sendStatus(500);
}
