import { type PrismaClient } from '@prisma/client';
import type UserEntity from '../../../../domain/entities/user.entity';
import { compareSync, hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import env from '../../../config/env';
import UnprocessableEntitieException from '../../exceptions/unprocessable-entitie.exception';
import type LoginDto from './dtos/login.dto';
import BadRequestException from '../../exceptions/bad-request.exception';
import type EditUserDto from './dtos/edit.dto';

export default class UserService {
  private readonly prisma: PrismaClient;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  async create(user: UserEntity) {
    const entityHasError = user.hasError();

    if (entityHasError) {
      throw new UnprocessableEntitieException({
        error: entityHasError,
      });
    }

    const userExist = await this.prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (userExist) {
      throw new Error('O email informado já está em uso');
    }

    const createUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashSync(user.password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });

    return {
      user: createUser,
      token: sign({ id: createUser.id }, env.jwtSecret),
    };
  }

  async login(user: LoginDto) {
    if (!user.email) {
      throw new BadRequestException('Email não informado.');
    }

    const findUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!findUser) {
      throw new BadRequestException('Usuário não encontrado.');
    } else if (!compareSync(user.password, findUser.password)) {
      throw new BadRequestException('Senha incorreta.');
    }

    const { password, ...userData } = findUser;

    return {
      user: userData,
      token: sign({ id: userData.id }, env.jwtSecret),
    };
  }

  async edit(cod: string, user: EditUserDto) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: cod,
      },
    });

    if (!findUser) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    if (user.name === '' || user.email === '' || user.password === '') {
      throw new UnprocessableEntitieException('Campos obrigatórios vazios.');
    }

    const result = await this.prisma.user.update({
      where: {
        id: cod,
      },
      data: {
        name: user.name,
        email: user.email,
        password: hashSync(user.password, 10),
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        createdAt: false,
        updatedAt: true,
      },
    });

    return {
      user: result,
    };
  }
}
