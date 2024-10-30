import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateOrderDto {

    @ApiProperty({
        type: String,
        description: 'descripcion de la orden'
    })
    @IsString()
    description: string

    @ApiProperty({
        type: Number,
        description: 'id del cliente que realiza la orden'
    })
    @IsNumber()
    clientId: number
    @IsNumber()
    restaurantId: number

    @ApiProperty({
        type: Date,
        description: 'fecha de la reservacion'
    })
    @Type(() => Date)
    @IsNotEmpty()
    date: Date

    @ApiProperty({
        type: [Number],
        description: 'array de enteros donde cada elemento es la edad, la longitud es la cantidad de personas'
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsNumber({}, { each: true })
    persons: number[]
}