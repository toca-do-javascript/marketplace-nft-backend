import 'dotenv/config';

const env = {
  jwtSecret: process.env.JWT_SECRET ?? 'secret',
};

export default env;
