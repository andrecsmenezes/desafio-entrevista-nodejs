import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateEstablishmentDto } from './create-establishment.dto';
import {Type} from "class-transformer";
import {Address} from "../../common/entities/address.entity";
import {
    IsNotEmpty,
    IsNumber,
    IsNumberString, IsOptional,
    IsPhoneNumber,
    IsPositive,
    IsString,
    Length,
    ValidateNested
} from "class-validator";
import {IAddressUpdateRequest} from "../../common/interfaces/address.interface";

export class UpdateEstablishmentDto extends PartialType(CreateEstablishmentDto) {
    @ApiProperty()

    @IsOptional()
    @Type(() => Address)
    @ValidateNested()
    address?: IAddressUpdateRequest;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    carVacancies?: number;

    @IsOptional()
    @IsNumberString()
    @Length(14)
    cnpj?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    motorcycleVacancies?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;
}
