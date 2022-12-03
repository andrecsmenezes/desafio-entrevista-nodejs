import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database.module";
import {ReportsController} from "./reports.controller";
import {ReportsService} from "./reports.service";
import {establishmentsProviders} from "../establishments/establishments.providers";
import {vehiclesProviders} from "../vehicles/vehicles.providers";
import {addressesProviders} from "../common/providers/addresses.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [ReportsController],
    providers: [...establishmentsProviders, ...vehiclesProviders, ...addressesProviders, ReportsService]
})
export class ReportsModule {}
