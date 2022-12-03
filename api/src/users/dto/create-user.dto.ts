import {IsEmail, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()

    @IsEmail()
    email: string;

    @IsString()
    @Length(8,20)
    password: string;
}
