import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateClientDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    @IsNumber()
    age: number

    @IsNumber()
    @IsOptional()
    restaurantId: number
}