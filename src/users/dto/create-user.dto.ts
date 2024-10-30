import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        type: String,
        description: 'Correo del usuario'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        description: 'Contraseña del usuario'
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        type: String,
        description: 'Nombre del usuario'
    })
    @IsNotEmpty()
    name: string;
}