import {
  AfterInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IEstablishment } from '../establishments.interface';
import { Address } from '../../common/entities/address.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { VehicleType } from '../../vehicles/vehicles.interface';
import { NotFoundException } from '@nestjs/common';
import { EstablishmentMovement } from './establishmentMoviment.entity';

@Entity('establishments')
export class Establishment implements IEstablishment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Column()
  phone: string;

  @Column('int')
  carVacancies: number;

  @Column('int')
  motorcycleVacancies: number;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.establishment)
  vehicles: Array<Vehicle>;

  @OneToMany(
    () => EstablishmentMovement,
    (establishmentMovement) => establishmentMovement.establishment,
  )
  movement: Array<EstablishmentMovement>;

  @AfterInsert()
  getVacancies(type: VehicleType) {
    if (type === VehicleType.CAR) {
      return this.carVacancies;
    }

    if (type === VehicleType.MOTORCYCLE) {
      return this.motorcycleVacancies;
    }

    throw new NotFoundException('Type of vehicle not found', {
      description: 'VEHICLE_TYPE_NOT_FOUND',
    });
  }
}
