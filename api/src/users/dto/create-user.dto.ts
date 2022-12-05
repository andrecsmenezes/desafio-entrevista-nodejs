import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUserCreateRequest } from '../users.interface';

export class CreateUserDto implements IUserCreateRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;
}
