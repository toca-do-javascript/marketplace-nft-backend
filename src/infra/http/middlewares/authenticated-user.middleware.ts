import type { NextFunction, Request, Response } from 'express';
import UnauthorizedException from '../exceptions/unauthorized.exception';
import { verify } from 'jsonwebtoken';
import env from '../../config/env';

export interface AuthenticatedUser {
  id: string;
}

export default function (req: Request, res: Response, next: NextFunction) {
  console.log(req.headers.authorization?.split(' '));

  const [type, token] = req.headers.authorization?.split(' ') ?? [];

  if (!type && type !== 'Bearer' && !token) {
    throw new UnauthorizedException('Token mal formatado.');
  }

  verify(token, env.jwtSecret, (error, decoded) => {
    if (error) {
      throw new UnauthorizedException('Token Inválido.');
    }
    // eslint-disable-next-line @typescript-eslint/dot-notation
    req['user'] = decoded;
    next();
  });
}
