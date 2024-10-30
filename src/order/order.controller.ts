import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { OrderOptionsService } from './order-options/order-options.service';
import { CreateOrderOptionsDto } from './dto/create-order-options.dto';
import { UpdateOrderDto } from './dto/update-order.dto';


@ApiTags('Orders')
@Controller('order')
export class OrderController {


    constructor(
        private readonly orderService: OrderService,
        private readonly orderOptionsServices: OrderOptionsService
    ) { }

    @Post()
    @ApiCreatedResponse({
        description: "La orden ha sido creada exitosamente",
        type: CreateOrderDto
    })
    @ApiUnauthorizedResponse({
        description: "No autorizado"
    })
    @ApiBody({ type: [CreateOrderDto] })
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto)
    }

    @Get(':id')
    @ApiOkResponse({
        description: "orden devuelta exitosamente",
        type: CreateOrderDto
    })
    @ApiUnauthorizedResponse({
        description: "No autorizado"
    })
    @ApiParam({ name: 'id', type: Number })
    getOrder(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.getOrder(id)
    }

    @Patch(':id')
    @ApiBody({ type: CreateOrderDto })
    @ApiParam({ name: 'id', type: Number, required: true })
    @ApiOkResponse({
        description: "orden actualizada exitosamente",
        type: CreateUserDto
    })
    @ApiUnauthorizedResponse({
        description: "No autorizado"
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.updateOrder(updateOrderDto, id)
    }

    @Get()
    @ApiOkResponse({
        description: "devueve las ordenes existentes",
        type: [CreateOrderDto]
    })
    @ApiUnauthorizedResponse({
        description: "No autorizado"
    })
    getAllOrders() {
        return this.orderService.getAllOrders()
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({
        description: "orden eliminada exitosamente",
        type: CreateOrderDto
    })
    @ApiUnauthorizedResponse({
        description: "No autorizado"
    })
    deleteOrder(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.deleteOrder(id)
    }

    @Post('options')
    @ApiBody({ type: CreateOrderOptionsDto })
    @ApiParam({ name: 'id', type: Number })
    @ApiCreatedResponse({
        description: "OrderOptions creado o editado exitosamente",
        type: CreateOrderOptionsDto
    })
    @ApiOkResponse({
        description: "OrderOptions eliminado exitosamente",
        type: CreateOrderOptionsDto
    })
    @ApiUnauthorizedResponse({
        description: "No autorizado"
    })
    createOrUpdateOrderOptions(@Body() createOrderOptionsDto: CreateOrderOptionsDto) {
        return this.orderOptionsServices.createOrEdit(createOrderOptionsDto)
    }

    @Delete('options/:id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({
        description: "OrderOptions eliminado exitosamente",
        type: CreateOrderOptionsDto
    })
    @ApiUnauthorizedResponse({
        description: "No autorizado"
    })
    deleteOrderOptions(@Param('id', ParseIntPipe) id: number) {
        return this.orderOptionsServices.delete(id)
    }
}
