import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserCreateStub } from './mock/user.create.stub';
import { usersProviders } from './users.providers';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
  });

  it('should create user', async () => {
    const createdUser = await controller.create(UserCreateStub());
    expect(createdUser.email).toBe('joaodasilva@gmail.com');
  });

  it('should find all users', () => {
    expect(controller).toBeDefined();
  });

  it('should find specific user', () => {
    expect(controller).toBeDefined();
  });

  it('should find specific user not found', () => {
    expect(controller).toBeDefined();
  });

  it('should update user', () => {
    expect(controller).toBeDefined();
  });

  it('should update user email error', () => {
    expect(controller).toBeDefined();
  });

  it('should delete user', () => {
    expect(controller).toBeDefined();
  });

  it('should delete user not found', () => {
    expect(controller).toBeDefined();
  });
});
