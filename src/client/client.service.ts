import { HttpException, Injectable, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    onModuleDestroy() {
        this.$connect()
    }

    onModuleInit() {
        this.$disconnect()
    }

    async createClient(createClientDto: CreateClientDto) {
        try {
            const client = await this.client.create({
                data: {
                    ...createClientDto
                }
            })
            return client
        } catch (error) {
            if (error.code === 'P2002') throw new HttpException('client email already exists', 400)
            if (error.code === 'P2003') throw new HttpException('restaurant id not exists', 400)
            throw new HttpException(error?.message, 400)
        }
    }

    async getClient(id: number) {
        try {
            const client = await this.client.findUnique({ where: { id } })
            if (!client) throw new NotFoundException('client not found')
            return client
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    async updateClient(updateClientDto: UpdateClientDto, id: number) {
        try {
            const client = await this.client.findUnique({ where: { id } })
            if (!client) throw new NotFoundException('client not found')
            const newClient = await this.client.update({ where: { id }, data: updateClientDto })
            return newClient
        } catch (error) {
            if (error.code === 'P2002') throw new HttpException('client email already exists', 400)
            throw new HttpException(error?.message, 400)
        }
    }

    async getAllClients() {
        try {
            return this.client.findMany()
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    async deleteClient(id: number) {
        try {
            return this.client.delete({ where: { id } })
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }
}
