import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('restaurants')
@Controller('restaurant')
export class RestaurantController {

    constructor(private readonly restaurantService: RestaurantService) { }

    @ApiBody({ type: [CreateRestaurantDto] })
    @ApiCreatedResponse({
        description: "El restaurante ha sido creada exitosamente",
        type: CreateRestaurantDto
    })
    @ApiUnauthorizedResponse({
        description: "No autorizado"
    })
    @Post()
    create(@Body() createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantService.createRestaurant(createRestaurantDto)

    }

    @ApiOkResponse({
        description: "El restaurante ha sido devuelto exitosamente",
        type: CreateRestaurantDto,
    })
    @ApiUnauthorizedResponse({
        description: "No autorizado"
    })
    @ApiNotFoundResponse({
        description: "Restaurante no encontrado"
    })
    @ApiParam({ name: 'id', type: Number })
    @Get(':id')
    getRestaurant(@Param('id', ParseIntPipe) id: number) {
        return this.restaurantService.getRestaurant(id)
    }

    @Get()
    @ApiOkResponse({
        description: "Los restaurantes han sido devueltos exitosamente",
        type: CreateRestaurantDto,
    })
    @ApiUnauthorizedResponse({
        description: "No autorizado"
    })
    getAllRestaurants() {
        return this.restaurantService.getAllRestaurants()
    }

    @ApiParam({ name: 'id', type: Number })
    @Patch(':id')
    @ApiOkResponse({
        description: "El restaurante ha sido actualizado exitosamente",
        type: CreateRestaurantDto,
    })
    @ApiUnauthorizedResponse({
        description: "No autorizado"
    })
    @ApiNotFoundResponse({
        description: "restaurante no encontrado"
    })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRestaurantDto: CreateRestaurantDto) {

        return this.restaurantService.updateRestaurant(updateRestaurantDto, id)
    }

    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({
        description: "El restaurante ha sido eliminado exitosamente",
        type: CreateRestaurantDto,
    })
    @ApiUnauthorizedResponse({
        description: "No autorizado"
    })
    @ApiNotFoundResponse({
        description: "Restaurante no encontrado"
    })
    @Delete(':id')
    @HttpCode(200)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.restaurantService.deleteRestaurant(id)
    }
}
