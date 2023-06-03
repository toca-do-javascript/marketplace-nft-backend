import { type Request, type Response } from 'express';
import type UserService from './user.service';
import type CreateUserDto from './dtos/create-user.dto';
import UserEntity from '../../../../domain/entities/user.entity';
import type LoginDto from './dtos/login.dto';

export default class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async create(req: Request, res: Response) {
    const { email, name, password } = req.body as CreateUserDto;

    const createdUser = await this.userService.create(
      new UserEntity({ email, name, password })
    );

    return res.status(201).json(createdUser);
  }

  async login(req: Request, res: Response) {
    const body = req.body as LoginDto;

    const loginUser = await this.userService.login(body);

    return res.status(200).json(loginUser);
  }
}
