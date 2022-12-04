import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  InsertEvent,
  PrimaryGeneratedColumn,
  UpdateEvent,
} from 'typeorm';
import { IUser } from '../users.interface';
import { ApiProperty } from '@nestjs/swagger';

import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { isUndefined } from 'lodash';

@Entity('users')
export class User implements IUser {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async maybeCryptPassword(event: InsertEvent<User> | UpdateEvent<User>) {
    const salt = await bcrypt.genSalt(10);

    if (
      !isUndefined(event) &&
      event.entity?.password &&
      this.password === event.entity.password
    ) {
      return;
    }

    return (
      this.password &&
      (await new Promise((resolve, reject) => {
        bcrypt.hash(this.password, salt, (error, hash) => {
          if (error) {
            reject(error);
          }
          resolve((this.password = hash));
        });
      }))
    );
  }
}
