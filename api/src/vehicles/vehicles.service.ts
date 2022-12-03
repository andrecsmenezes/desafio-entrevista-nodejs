import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import {
  DeleteResult,
  EntityNotFoundError,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class VehiclesService {
  constructor(
    @Inject('VEHICLE_REPOSITORY')
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(createVehicleDto);
    return this.vehicleRepository.save(vehicle);
  }

  async findAll(): Promise<Array<Vehicle>> {
    return await this.vehicleRepository.find();
  }

  async findOne(id: number): Promise<Vehicle> {
    return await this.vehicleRepository.findOneOrFail({ where: { id } });
  }

  async update(
    id: number,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<UpdateResult> {
    await this.vehicleRepository.findOneOrFail({ where: { id } });
    return await this.vehicleRepository.update(id, updateVehicleDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.vehicleRepository.findOneOrFail({ where: { id } });
    return await this.vehicleRepository.delete(id);
  }

  async findByBoard(board: string): Promise<Vehicle> {
    try {
      return await this.vehicleRepository.findOneOrFail({
        where: { board },
        relations: ['establishment'],
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new BadRequestException('Vehicle not found', {
          description: 'VEHICLE_NOT_FOUND',
        });
      }

      throw new BadRequestException('Something was wrong on search vehicle', {
        description: 'VEHICLE_UNKNOWN_ERROR',
      });
    }
  }
}
