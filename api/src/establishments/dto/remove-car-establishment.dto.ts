import { IEstablishmentRemoveCarRequest } from '../establishments.interface';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveCarEstablishmentDto
  implements IEstablishmentRemoveCarRequest
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board: string;
}
