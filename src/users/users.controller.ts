import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from 'src/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({
        description: "El usuario ha sido registrado exitosamente",
        type: CreateUserDto,
    })
    @ApiResponse({
        status: 409,
        description: "Ya existe un usuario con el mismo correo"
    })
    @Public()
    @Post('register')
    registerUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.registerUser(createUserDto)
    }
    @ApiBody({ type: LoginUserDto })
    @ApiOkResponse({
        description: "El usuario ha sido logeado exitosamente",
        type: CreateUserDto,
    })
    @ApiResponse({
        status: 401,
        description: "credenciales inváalidas"
    })
    @ApiNotFoundResponse({
        description: "Usuario no encontrado"
    })
    @Public()
    @Post('login')
    login(@Body() loginUser: LoginUserDto) {
        return this.userService.loginUser(loginUser)
    }

    @ApiBody({ type: [CreateUserDto] })
    @ApiOkResponse({
        description: "El usuario ha sido actualizado exitosamente",
        type: CreateUserDto,
    })
    @ApiResponse({
        status: 409,
        description: "Ya existe un usuario con el mismo correo"
    })
    @ApiNotFoundResponse({
        description: "Usuario no encontrado"
    })
    @ApiParam({ name: 'id', type: Number })
    @Patch(':id')
    updateUser(@Body() updateUserDto: CreateUserDto, @Param('id', ParseIntPipe) id: number) {
        return this.userService.updateUser(id, updateUserDto)
    }

    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({
        description: "El usuario ha sido eliminado exitosamente",
        type: CreateUserDto,
    })
    @ApiNotFoundResponse({
        description: "Usuario no encontrado"
    })
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id)
    }
}
