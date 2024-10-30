import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, Min } from "class-validator";

export class CreateOrderOptionsDto {

    @ApiProperty({
        type: Number,
        description: 'Edad minima para reservar una mesa',
        default: 15
    })
    @IsNumber()
    @IsPositive()
    @Min(15)
    adultAgeLimit: number
}