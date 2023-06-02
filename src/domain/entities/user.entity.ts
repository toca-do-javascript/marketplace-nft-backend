import z from 'zod';

export default class UserEntity {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: IUserEntity) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  isValid(): Error | true {
    const schema = z.object({
      name: z.string().trim().min(3).max(255),
      email: z.string().trim().email(),
      password: z.string().trim().min(6).max(255),
    });

    const validation = schema.safeParse({
      name: this.name,
      email: this.email,
      password: this.password,
    });

    if (!validation.success) {
      return new Error(JSON.stringify(validation.error.issues));
    }

    return true;
  }
}

interface IUserEntity {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
