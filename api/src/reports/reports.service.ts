import { Inject, Injectable } from '@nestjs/common';
import { Establishment } from '../establishments/entities/establishment.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { VehicleType } from '../vehicles/vehicles.interface';
import { Repository } from 'typeorm';
import { Address } from '../common/entities/address.entity';
import { IResumeResponse } from './reports.interface';

@Injectable()
export class ReportsService {
  constructor(
    @Inject('ESTABLISHMENT_REPOSITORY')
    private readonly establishmentRepository: Repository<Establishment>,

    @Inject('ADDRESS_REPOSITORY')
    private readonly addressRepository: Repository<Address>,

    @Inject('VEHICLE_REPOSITORY')
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async getResume(): Promise<IResumeResponse> {
    const establishments = this.establishmentRepository.count({});
    const vehicles = this.vehicleRepository.count({});
    const cars = this.vehicleRepository.count({
      where: { vehicleType: VehicleType.CAR },
    });
    const motorcycles = this.vehicleRepository.count({
      where: { vehicleType: VehicleType.MOTORCYCLE },
    });

    const [countEstablishment, countVehicles, countCars, CountMotorcycles] =
      await Promise.all([establishments, vehicles, cars, motorcycles]);

    return {
      establishments: countEstablishment,
      vehicles: {
        cars: countCars,
        motorcycles: CountMotorcycles,
        total: countVehicles,
      },
    };
  }
}
