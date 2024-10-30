import { HttpException, Injectable, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleDestroy() {
        return this.$disconnect()
    }
    onModuleInit() {
        return this.$connect()
    }

    async createRestaurant(createRestaurantDto: CreateRestaurantDto) {

        try {
            const restaurant = await this.restaurant.create({
                data: {
                    ...createRestaurantDto
                }
            })
            return restaurant
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    async updateRestaurant(updateRestaurantDto: UpdateRestaurantDto, id: number) {

        try {
            const res = await this.restaurant.update({
                where: { id },
                data: updateRestaurantDto
            })
            return res
        } catch (error) {
            if (error.code === 'P2025') throw new NotFoundException('Restaurant not found')
            throw new HttpException(error?.message, 400)
        }
    }

    async getRestaurant(id: number) {
        try {
            const res = await this.restaurant.findUnique({ where: { id }, include: { clients: true } })
            if (!res) throw new NotFoundException('restaurant not found')
            return res
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    getAllRestaurants() {
        try {
            return this.restaurant.findMany()
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    deleteRestaurant(id: number) {
        try {
            return this.restaurant.delete({ where: { id } })
        } catch (error) {
            if (error.code === 'P2025') throw new NotFoundException('Restaurant not found')
            throw new HttpException(error?.message, 400)
        }
    }
}
