import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';
import {IsEnum, IsOptional, IsString} from "class-validator";
import {CarBrand, CarType, MotorcycleBrand, MotorcycleType, VehicleType} from "../vehicles.interface";

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
    @ApiProperty()

    @IsOptional()
    @IsString()
    board?: string;

    @IsOptional()
    @IsEnum([CarBrand,MotorcycleBrand])
    brand?: CarBrand | MotorcycleBrand;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsEnum([CarType,MotorcycleType])
    type?: CarType | MotorcycleType;

    @IsOptional()
    @IsEnum(VehicleType)
    vehicleType?: VehicleType;
}
