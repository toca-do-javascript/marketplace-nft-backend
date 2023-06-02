import { type Request, type Response } from 'express';
import type UserService from './user.service';
import type CreateUserDto from './dtos/create-user.dto';
import UserEntity from '../../../../domain/entities/user.entity';

export default class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async create(req: Request, res: Response) {
    const { email, name, password } = req.body as CreateUserDto;

    const user = await this.userService.create(
      new UserEntity({ email, name, password })
    );

    return res.status(201).json(user);
  }
}
