import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, OnModuleDestroy, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcryptjs";
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './interfaces/users-login.interface';
import { UpdateUsertDto } from './dto/update-user.dto';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor(private jwtService: JwtService) {
        super()
    }
    onModuleDestroy() {
        this.$disconnect()
    }

    onModuleInit() {
        this.$connect()
    }

    async registerUser(createUserDto: CreateUserDto) {
        try {
            const user = await this.user.create({
                data: { ...createUserDto, password: await bcrypt.hash(createUserDto.password, 10) }
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user
            return result
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Email already registered');
            }
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async loginUser(loginUserDto: LoginUserDto) {

        const user = await this.user.findUnique({ where: { email: loginUserDto.email } })
        if (!user) throw new NotFoundException('user not found')
        try {
            if (!(await bcrypt.compare(loginUserDto.password, user.password)))
                throw new UnauthorizedException('invalid credentials')

            const payload: UserPayload = {
                email: user.email,
                sub: user.id,
                name: user.email
            }

            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }

    }


    async updateUser(id: number, updateUserDto: UpdateUsertDto): Promise<User> {
        try {
            await this.user.findUniqueOrThrow({
                where: { id },
            });

            const updatedUser = await this.user.update({
                where: { id },
                data: {
                    ...updateUserDto,
                    ...(updateUserDto.password && {
                        password: await bcrypt.hash(updateUserDto.password, 10),
                    }),
                },
            });

            // remove password from response
            delete updatedUser.password;

            return updatedUser;
        } catch (error) {
            // si el usuario no se encuentra lanza error
            if (error.code === 'P2025') {
                throw new NotFoundException(`User with id ${id} not found`);
            }

            // si el correo ya existe lanza error
            if (error.code === 'P2002') {
                throw new ConflictException('Email already registered');
            }

            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }


    async deleteUser(id: number): Promise<string> {
        try {
            const user = await this.user.findUniqueOrThrow({
                where: { id },
            });

            await this.user.delete({
                where: { id },
            });

            return `User with id ${user.id} deleted`;
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException(`User with id ${id} not found`);
            }

            throw new HttpException(error, 500);
        }
    }



}
