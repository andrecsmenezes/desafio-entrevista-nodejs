import { Module } from '@nestjs/common';
import { EstablishmentsService } from './establishments.service';
import { EstablishmentsController } from './establishments.controller';
import {DatabaseModule} from "../database.module";
import {establishmentsProviders} from "./establishments.providers";
import {VehiclesService} from "../vehicles/vehicles.service";
import {vehiclesProviders} from "../vehicles/vehicles.providers";
import {addressesProviders} from "../common/providers/addresses.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [EstablishmentsController],
  providers: [...establishmentsProviders, ...vehiclesProviders, ...addressesProviders, EstablishmentsService, VehiclesService, ]
})
export class EstablishmentsModule {}
