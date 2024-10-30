import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRestaurantDto {

    @ApiProperty({
        type: String,
        description: 'Nombre del restaurante'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Direccion del restaurante'
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        type: Number,
        description: 'capacodad del restaurante'
    })
    @IsNumber()
    @IsNotEmpty()
    capacity: number

}