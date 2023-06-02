import prismaClient from '../prismaClient';

interface IUserProps {
  email: string;
  name: string;
  password: string;
}

export class CreateUserService {
  async execute({ email, name, password }: IUserProps) {
    const userExist = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userExist) {
      throw new Error('Usuário já existente!!!');
    }

    if (name === '' || email === '' || password === '') {
      throw new Error('Campos obrigatórios não preenchidos!!!');
    }

    const createUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return createUser;
  }
}
