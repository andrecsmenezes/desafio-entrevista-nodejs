import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { vehiclesProviders } from './vehicles.providers';
import { DatabaseModule } from '../database.module';

describe('VehiclesController', () => {
  let controller: VehiclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [VehiclesController],
      providers: [...vehiclesProviders, VehiclesService],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
