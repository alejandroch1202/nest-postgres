import * as bcryptjs from 'bcryptjs';

export const hashPassword = (password: string) => {
  return bcryptjs.hashSync(password, 10);
};

export const comparePassword = (password: string, hash: string) => {
  return bcryptjs.compareSync(password, hash);
};
