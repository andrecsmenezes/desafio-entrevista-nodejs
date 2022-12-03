import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import {DatabaseModule} from "../database.module";
import {vehiclesProviders} from "./vehicles.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [VehiclesController],
  providers: [...vehiclesProviders, VehiclesService]
})
export class VehiclesModule {}
