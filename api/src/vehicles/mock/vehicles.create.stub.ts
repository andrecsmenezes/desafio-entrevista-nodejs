import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { CarBrand, CarType, VehicleType } from '../vehicles.interface';

export const VehicleCreateStub = (): CreateVehicleDto => {
  return {
    board: 'AAA0000',
    brand: CarBrand.AUDI,
    color: 'BLACK',
    model: 'A3',
    type: CarType.HATCH,
    vehicleType: VehicleType.CAR,
  };
};
