import { HttpException, Injectable, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOrderOptionsDto } from '../dto/create-order-options.dto';

@Injectable()
export class OrderOptionsService extends PrismaClient implements OnModuleInit, OnModuleDestroy {


    onModuleDestroy() {
        this.$disconnect()
    }

    onModuleInit() {
        this.$connect()
    }

    async createOrEdit(orderOptions: CreateOrderOptionsDto) {
        try {
            const firstOptions = await this.orderOptions.findFirst({ where: { name: "order-options" } })
            if (firstOptions)
                return this.orderOptions.update({ where: { id: firstOptions.id }, data: orderOptions })
            return this.orderOptions.create({ data: orderOptions })
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    delete(id: number) {
        try {
            return this.orderOptions.delete({ where: { id } })
        } catch (error) {
            if (error.code === 'P2025') throw new NotFoundException('orderOptions not found')
            throw new HttpException(error?.message, 400)
        }
    }

}
