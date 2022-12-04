import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentsController } from './establishments.controller';
import { EstablishmentsService } from './establishments.service';
import { establishmentsProviders } from './establishments.providers';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Establishment } from './entities/establishment.entity';
import { EstablishmentCreateStub } from './mock/establishment.create.stub';
import { DatabaseModule } from '../database.module';

describe('EstablishmentsController', () => {
  let controller: EstablishmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [EstablishmentsController],
      providers: [
        ...establishmentsProviders,
        EstablishmentsService,
        {
          provide: getRepositoryToken(Establishment),
          useValue: {
            save: jest.fn().mockResolvedValue(EstablishmentCreateStub),
            find: jest.fn().mockResolvedValue([EstablishmentCreateStub]),
          },
        },
      ],
    }).compile();

    controller = module.get<EstablishmentsController>(EstablishmentsController);
  });

  it('should create establishment', () => {
    expect(controller).toBeDefined();
  });
  //
  // it('should create establishment name with just one word', () => {
  //   expect(controller).toBeDefined();
  // });
  //
  // it('should create establishment name with just one word', () => {
  //   expect(controller).toBeDefined();
  // });
  //
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
