import { IEstablishmentInsertCarRequest } from '../establishments.interface';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InsertCarEstablishmentDto
  implements IEstablishmentInsertCarRequest
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board: string;
}
