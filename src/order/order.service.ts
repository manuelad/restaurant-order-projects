import { ConflictException, HttpException, Injectable, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    onModuleDestroy() {
        this.$connect()
    }

    onModuleInit() {
        this.$disconnect()
    }

    constructor(private readonly configService: ConfigService) {
        super()
    }

    async create(createOrderDto: CreateOrderDto) {
        try {
            const { persons } = createOrderDto
            const rest = await this.restaurant.findUnique({ where: { id: createOrderDto.restaurantId } })
            if (!rest) throw new NotFoundException('restaurant not found')
            const allOrders = await this.order.findMany({
                where: {
                    restaurantId: createOrderDto.restaurantId,
                    date: createOrderDto.date
                }
            })
            const totalPersons = allOrders.reduce((acc, curr) => acc + curr.persons.length, 0)
            if (totalPersons + persons.length > rest.capacity)
                // si la cantidad de personas de la reservacion mas las que ya estaban exceden la capacidad
                throw new HttpException(`capacity exceeded ${totalPersons + persons.length}, of capacity ${rest.capacity} `, 400)
            const minAgeLimit = (await this.orderOptions.findFirst({}))?.adultAgeLimit ?? this.configService.get<number>('ADULT_AGE_LIMIT')
            const existChild = persons.some(person => person < minAgeLimit)
            if (existChild)
                // si existe un menor de edad no se puede hacer la resefvacion
                throw new HttpException('child not allowed', 400)
            const order = await this.order.create({ data: { ...createOrderDto } })
            return order
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    async getOrder(id: number) {
        try {
            const order = await this.order.findUnique({ where: { id }, include: { client: true, Restaurant: true } })
            if (!order) throw new NotFoundException('order not found')
            return order
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    getAllOrders() {
        try {
            return this.order.findMany()
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    async deleteOrder(id: number) {
        try {
            const order = await this.order.delete({ where: { id } })
            return order
        } catch (error) {
            if (error.code === 'P2025') throw new NotFoundException('order not found')
            throw new HttpException(error?.message, 400)
        }
    }

    async updateOrder(updateOrderDto: UpdateOrderDto, id: number) {
        try {
            const order = await this.order.findUnique({ where: { id } })
            if (!order) throw new NotFoundException('order not found')
            const updateOrder = await this.order.update({ where: { id }, data: { ...updateOrderDto } })
            return updateOrder
        } catch (error) {
            if (error.code === 'P2003')
                throw new ConflictException(`rerstaurant ${updateOrderDto.restaurantId} or client ${updateOrderDto.clientId} not exists`)
            throw new HttpException(error?.message, 400)
        }
    }



}
