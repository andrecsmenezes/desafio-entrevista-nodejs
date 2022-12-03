import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAddress } from '../../common/interfaces/address.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Establishment } from '../../establishments/entities/establishment.entity';

@Entity('addresses')
export class Address implements IAddress {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  complement: string;

  @Column()
  country: string;

  @Column()
  neighborhood: string;

  @Column()
  number: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  zipCode: string;
}
