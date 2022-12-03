import { CreateUserDto } from '../dto/create-user.dto';

export const UserCreateStub = (): CreateUserDto => {
  return {
    email: 'joaodasilva@gmail.com',
    password: '12345678',
  };
};
