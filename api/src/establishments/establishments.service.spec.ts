import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentsService } from './establishments.service';
import { establishmentsProviders } from './establishments.providers';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Establishment } from './entities/establishment.entity';
import { EstablishmentCreateStub } from './mock/establishment.create.stub';
import { DatabaseModule } from '../database.module';
import {addressesProviders} from "../common/providers/addresses.providers";

describe('EstablishmentsService', () => {
  let service: EstablishmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        ...establishmentsProviders,
        ...addressesProviders,
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

    service = module.get<EstablishmentsService>(EstablishmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
