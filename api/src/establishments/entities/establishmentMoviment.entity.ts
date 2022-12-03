import {
  EstablishmentMovementType,
  IEstablishmentMovement,
} from '../establishments.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Establishment } from './establishment.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity('establishments_movement')
export class EstablishmentMovement implements IEstablishmentMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Establishment, (establishment) => establishment.movement, {
    eager: true,
  })
  establishment: Establishment;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.movement, { eager: true })
  vehicle: Vehicle;

  @Column()
  movementType: EstablishmentMovementType;

  @Column()
  dateTime: Date;
}
