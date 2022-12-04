import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserCreateStub } from './mock/user.create.stub';
import { DatabaseModule } from '../database.module';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
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

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
