import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { EstablishmentsService } from './establishments.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { InsertCarEstablishmentDto } from './dto/insert-car-establishment.dto';
import { VehiclesService } from '../vehicles/vehicles.service';
import { AppDataSource } from '../database.source';
import { RemoveCarEstablishmentDto } from './dto/remove-car-establishment.dto';
import { ApiQuery } from '@nestjs/swagger';
import { EstablishmentMovement } from './entities/establishmentMoviment.entity';
import { EstablishmentMovementType } from './establishments.interface';
import { Between } from 'typeorm';

@Controller('establishments')
export class EstablishmentsController {
  constructor(
    private readonly establishmentsService: EstablishmentsService,
    private readonly vehicleService: VehiclesService,
  ) {}

  @Post()
  async create(@Body() createEstablishmentDto: CreateEstablishmentDto) {
    const establishment = await this.establishmentsService.create(
      createEstablishmentDto,
    );
    return 'inserted';
  }

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async findAll(
    @Request() req: Request,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const options = {
      page: +(page || 1),
      limit: +(limit || 10),
      route: req.url,
    };

    return await this.establishmentsService.findAll(options);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.establishmentsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
  ) {
    return await this.establishmentsService.update(+id, updateEstablishmentDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.establishmentsService.remove(+id);
  }

  @Post(':id/insert-vehicle')
  @HttpCode(HttpStatus.CREATED)
  async insertVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() insertCarEstablishment: InsertCarEstablishmentDto,
  ) {
    const establishment = await this.establishmentsService.findOne(+id);

    if (
      establishment.vehicles.find(
        (vehicle) => vehicle.board === insertCarEstablishment.board,
      )
    ) {
      throw new BadRequestException(
        'Vehicle is already at this establishment',
        { description: 'ESTABLISHMENT_VEHICLE_FOUND' },
      );
    }

    const vehicle = await this.vehicleService.findByBoard(
      insertCarEstablishment.board,
    );
    const establishmentVehicles = establishment.vehicles.map(
      (v) => v.vehicleType === vehicle.vehicleType,
    );

    if (vehicle.establishment) {
      throw new BadRequestException(
        'Vehicle is already at another establishment',
        { description: 'VEHICLE_IN_ANOTHER_ESTABLISHMENT' },
      );
    }

    if (
      establishmentVehicles.length >=
      establishment.getVacancies(vehicle.vehicleType)
    ) {
      throw new BadRequestException('Establishment is full', {
        description: 'ESTABLISHMENT_FULL',
      });
    }

    vehicle.establishment = establishment;

    return await AppDataSource.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(vehicle);

        const movement = AppDataSource.getRepository(
          EstablishmentMovement,
        ).create({
          vehicle: vehicle,
          establishment: establishment,
          movementType: EstablishmentMovementType.ENTRANCE,
          dateTime: new Date(),
        });

        await transactionalEntityManager.save(movement);
      },
    );
  }

  @Post(':id/remove-vehicle')
  async removeVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() removeCarEstablishment: RemoveCarEstablishmentDto,
  ) {
    const establishment = await this.establishmentsService.findOne(+id);

    if (
      !establishment.vehicles.find(
        (vehicle) => vehicle.board === removeCarEstablishment.board,
      )
    ) {
      throw new BadRequestException('Vehicle not found at this establishment', {
        description: 'ESTABLISHMENT_VEHICLE_NOT_FOUND',
      });
    }

    const vehicle = await this.vehicleService.findByBoard(
      removeCarEstablishment.board,
    );

    if (vehicle.establishment?.id !== id) {
      throw new BadRequestException(
        'Vehicle is already at another establishment',
        { description: 'VEHICLE_IN_ANOTHER_ESTABLISHMENT' },
      );
    }

    vehicle.establishment = null;

    await AppDataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(vehicle);

      const movement = AppDataSource.getRepository(
        EstablishmentMovement,
      ).create({
        vehicle: vehicle,
        establishment: establishment,
        movementType: EstablishmentMovementType.EXIT,
        dateTime: new Date(),
      });

      await transactionalEntityManager.save(movement);
    });
  }

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'start', required: false, example: '2022-12-03 14:55' })
  @ApiQuery({ name: 'end', required: false, example: '2022-12-03 15:55' })
  @Get(':id/movement')
  async getMovement(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: Request,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    const dateStart = start ? new Date(start) : new Date().setHours(-1);
    const dateEnd = end ? new Date(end) : new Date();

    if (dateStart >= dateEnd) {
      throw new BadRequestException('Date start not be >= to the date end.', {
        description: 'DATE_COMPARE_ERROR',
      });
    }

    const options = {
      page: +(page || 1),
      limit: +(limit || 10),
      route: req.url,
    };

    const where = {
      where: {
        establishment: { id },
        dateTime: Between(dateStart, dateEnd),
      },
    };

    return await this.establishmentsService.getMovement(options, where);
  }

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get(':id/movement-per-hour')
  async getMovementPerHour(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: Request,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const options = {
      page: +(page || 1),
      limit: +(limit || 10),
      route: req.url,
    };

    return await this.establishmentsService.getMovementPerHour(id, options);
  }
}
