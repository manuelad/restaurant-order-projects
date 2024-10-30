import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class LoginUserDto {

    @ApiProperty({
        type: String,
        description: 'correo del usuario para la autenticacion'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        description: 'contraseña del usuario para la autenticacion'
    })
    @IsNotEmpty()
    password: string;
}