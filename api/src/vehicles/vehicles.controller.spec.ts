import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './entities/vehicle.entity';
import { CarBrand, CarType, VehicleType } from './vehicles.interface';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('VehiclesController', () => {
  let controller: VehiclesController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
    })
      .useMocker((token) => {
        if (token === VehiclesService) {
          const vehicle: CreateVehicleDto = {
            board: 'AAA0000',
            brand: CarBrand.FIAT,
            color: 'BLUE',
            model: 'UNO MILLE',
            type: CarType.HATCH,
            vehicleType: VehicleType.CAR,
          };
          const vehicleCreated = new Vehicle();
          vehicleCreated.id = 1;
          vehicleCreated.board = vehicle.board;
          vehicleCreated.brand = vehicle.brand;
          vehicleCreated.color = vehicle.color;
          vehicleCreated.model = vehicle.model;
          vehicleCreated.type = vehicle.type;
          vehicleCreated.vehicleType = vehicle.vehicleType;
          return {
            create: jest.fn().mockResolvedValue(vehicleCreated),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<VehiclesController>(VehiclesController);
  });

  it('should create a vehicle', async () => {
    const vehicle: CreateVehicleDto = {
      board: 'AAA0000',
      brand: CarBrand.FIAT,
      color: 'BLUE',
      model: 'UNO MILLE',
      type: CarType.HATCH,
      vehicleType: VehicleType.CAR,
    };
    const vehicleCreated = Object.assign(new Vehicle(), vehicle);
    vehicleCreated.id = 1;
    expect(await controller.create(vehicle)).toStrictEqual(vehicleCreated);
  });
});
