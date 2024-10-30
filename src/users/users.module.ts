import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            useFactory: async (config: ConfigService) => ({
                secret: config.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: `${config.get('JWT_EXPIRES_IN')}s`,
                },
            }),
            inject: [ConfigService],
        })
    ],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule { }
