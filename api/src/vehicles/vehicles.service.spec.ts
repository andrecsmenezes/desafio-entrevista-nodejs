import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { vehiclesProviders } from './vehicles.providers';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleCreateStub } from './mock/vehicles.create.stub';

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...vehiclesProviders,
        VehiclesService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {
            save: jest.fn().mockResolvedValue(VehicleCreateStub),
            find: jest.fn().mockResolvedValue([VehicleCreateStub]),
          },
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
