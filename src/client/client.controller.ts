import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {

    constructor(private readonly clientService: ClientService) { }

    @Post()
    async createClient(@Body() createClientDto: CreateClientDto) {
        try {
            return this.clientService.createClient(createClientDto)
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    @Get()
    async getAllClients() {
        try {
            return this.clientService.getAllClients()
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    @Get(':id')
    async getClient(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.clientService.getClient(id)
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    @Patch(':id')
    async updateClient(@Param('id', ParseIntPipe) id: number, @Body() updateClientDto: UpdateClientDto) {
        try {
            return this.clientService.updateClient(updateClientDto, id)
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }

    @Delete(':id')
    async deleteClient(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.clientService.deleteClient(id)
        } catch (error) {
            throw new HttpException(error?.message, 400)
        }
    }
}
