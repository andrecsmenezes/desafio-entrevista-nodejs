import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../users.interface';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User implements IUser {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
