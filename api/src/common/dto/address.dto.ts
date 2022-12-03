import { IAddressCreateRequest } from '../interfaces/address.interface';
import { IsNumberString, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddressCreateRequestDto implements IAddressCreateRequest {
  @ApiProperty()
  @IsString()
  complement: string;

  @IsString()
  @Length(2)
  country: string;

  @IsString()
  neighborhood: string;

  @IsNumberString()
  number: string;

  @IsString()
  @Length(2)
  state: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsNumberString()
  @Length(8)
  zipCode: string;
}
