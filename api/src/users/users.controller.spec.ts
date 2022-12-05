import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserCreateStub } from './mock/user.create.stub';
import { usersProviders } from './users.providers';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DatabaseModule } from '../database.module';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserCreateRequest } from './users.interface';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [UsersController],
      providers: [
        ...usersProviders,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue(UserCreateStub),
            find: jest.fn().mockResolvedValue([UserCreateStub]),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should create user', async () => {
    const userProps: IUserCreateRequest = {
      email: 'joaodasilva@gmail.com',
      password: '12345678',
    };

    const user: CreateUserDto = plainToInstance(CreateUserDto, userProps);
    const errors = await validate(user);

    jest.spyOn(service, 'create').mockImplementation();

    await expect(errors.length).toBe(0);
    await expect(controller.create(user)).toBe(undefined);
  });

  it('should find all users', async () => {
    // const userProps: IUserCreateRequest = {
    //   email: 'joaodasilva@gmail.com',
    //   password: '1234',
    // };
    //
    // const user: CreateUserDto = plainToInstance(CreateUserDto, userProps);
    // const errors = await validate(user);
    //
    // jest.spyOn(service, 'create').mockImplementation();

    await expect(controller.findAll()).toBe(1);
  });

  // it('should find all users', () => {
  //   expect(controller).toBeDefined();
  // });
  //
  // it('should find specific user', () => {
  //   expect(controller).toBeDefined();
  // });
  //
  // it('should find specific user not found', () => {
  //   expect(controller).toBeDefined();
  // });
  //
  // it('should update user', () => {
  //   expect(controller).toBeDefined();
  // });
  //
  // it('should update user email error', () => {
  //   expect(controller).toBeDefined();
  // });
  //
  // it('should delete user', () => {
  //   expect(controller).toBeDefined();
  // });
  //
  // it('should delete user not found', () => {
  //   expect(controller).toBeDefined();
  // });
});
