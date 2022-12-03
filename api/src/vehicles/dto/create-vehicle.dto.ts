import {
  CarBrand,
  CarType,
  IVehicleCreateRequest,
  MotorcycleBrand,
  MotorcycleType,
  VehicleType,
} from '../vehicles.interface';
import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto implements IVehicleCreateRequest {
  @ApiProperty()
  @IsString()
  board: string;

  @IsEnum([CarBrand, MotorcycleBrand])
  brand: CarBrand | MotorcycleBrand;

  @IsString()
  color: string;

  @IsString()
  model: string;

  @IsEnum([CarType, MotorcycleType])
  type: CarType | MotorcycleType;

  @IsEnum(VehicleType)
  vehicleType: VehicleType;
}
