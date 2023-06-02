import type { Request, Response } from 'express';
import { CreateUserService } from '../services/createUserService';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const userService = new CreateUserService();

    const { name, email, password } = req.body;

    const response = await userService.execute({
      name,
      email,
      password,
    });

    return res.status(201).json(response);
  }
}
