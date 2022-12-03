import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import {
  DeleteResult,
  EntityNotFoundError,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Establishment } from './entities/establishment.entity';
import { Address } from '../common/entities/address.entity';
import { AppDataSource } from '../database.source';
import {
  IPaginationOptions,
  paginate,
  paginateRaw,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { EstablishmentMovement } from './entities/establishmentMoviment.entity';
import { EstablishmentMovementType } from './establishments.interface';

@Injectable()
export class EstablishmentsService {
  private logger = new Logger(Establishment.name);

  constructor(
    @Inject('ESTABLISHMENT_REPOSITORY')
    private readonly establishmentRepository: Repository<Establishment>,

    @Inject('ADDRESS_REPOSITORY')
    private readonly addressRepository: Repository<Address>,

    @Inject('ESTABLISHMENT_MOVEMENT_REPOSITORY')
    private readonly establishmentMovementRepository: Repository<EstablishmentMovement>,
  ) {}

  async create(
    createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<Establishment> {
    const establishment = this.establishmentRepository.create(
      createEstablishmentDto,
    );
    const address = this.addressRepository.create(
      createEstablishmentDto.address,
    );

    return await AppDataSource.transaction(
      async (transactionalEntityManager) => {
        const addressTransaction = await transactionalEntityManager.save(
          address,
        );
        establishment.address = addressTransaction;
        return await transactionalEntityManager.save(establishment);
      },
    );
  }

  async findAll(options: IPaginationOptions) {
    return paginate<Establishment>(this.establishmentRepository, options);
  }

  async findOne(id: number): Promise<Establishment> {
    try {
      return await this.establishmentRepository.findOneOrFail({
        where: { id },
        relations: { address: true, vehicles: true },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new BadRequestException('Establishment not found', {
          description: 'ESTABLISHMENT_NOT_FOUND',
        });
      }

      this.logger.error(error);
      throw new BadRequestException('Something as wrong', {
        description: 'ESTABLISHMENT_UNKNOWN_ERROR',
      });
    }
  }

  async update(
    id: number,
    updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<UpdateResult> {
    await this.establishmentRepository.findOneOrFail({ where: { id } });
    return await this.establishmentRepository.update(
      id,
      updateEstablishmentDto,
    );
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.establishmentRepository.findOneOrFail({ where: { id } });
    return await this.establishmentRepository.delete(id);
  }

  async getMovement(options: IPaginationOptions, findOptions: any) {
    return await paginate<EstablishmentMovement>(
      this.establishmentMovementRepository,
      options,
      findOptions,
    );
  }

  async getMovementPerHour(id: number, options: IPaginationOptions) {
    const queryBuilder =
      this.establishmentMovementRepository.createQueryBuilder();
    queryBuilder
      .select('COUNT(1) quant')
      .addSelect('YEAR(dateTime)', 'year')
      .addSelect('MONTH(dateTime)', 'month')
      .addSelect('DAY(dateTime)', 'day')
      .addSelect('HOUR(dateTime)', 'hour')
      .addSelect('movementType')
      .where('establishmentId = :establishment_id', { establishment_id: id })
      .groupBy(
        'YEAR(dateTime), MONTH(dateTime), DAY(dateTime), HOUR(dateTime), movementType',
      )
      .orderBy(
        'YEAR(dateTime), MONTH(dateTime), DAY(dateTime), HOUR(dateTime), establishmentId, movementType, COUNT(1)',
        'DESC',
      );

    const result = await paginateRaw<EstablishmentMovement>(
      queryBuilder,
      options,
    );

    return new Pagination(
      result.items.map((item: any) => {
        return {
          ...item,
          quant: parseInt(item.quant),
        };
      }),
      result.meta,
      result.links,
    );
  }
}
