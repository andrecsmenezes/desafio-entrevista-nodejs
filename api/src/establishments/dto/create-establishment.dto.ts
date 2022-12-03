import {IEstablishmentCreateRequest} from "../establishments.interface";
import {AddressCreateRequestDto} from "../../common/dto/address.dto";
import {Type} from "class-transformer";
import {Address} from "../../common/entities/address.entity";
import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsPhoneNumber,
    IsPositive,
    IsString,
    Length,
    ValidateNested
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateEstablishmentDto implements IEstablishmentCreateRequest{
    @ApiProperty()

    @Type(() => Address)
    @ValidateNested()
    address: AddressCreateRequestDto;

    @IsNumber()
    @IsPositive()
    carVacancies: number;

    @IsNumberString()
    @Length(14)
    cnpj: string;

    @IsNumber()
    @IsPositive()
    motorcycleVacancies: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsPhoneNumber()
    phone: string;
}
