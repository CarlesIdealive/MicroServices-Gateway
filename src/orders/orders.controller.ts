import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Inject, 
  ParseUUIDPipe,
  Query,
  Patch
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto, PaginationOrderDto, StatusOrderDto } from './dto/orders.dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    try {
      
      const newOrder = this.client.send('createOrder', createOrderDto);
      return newOrder;

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll(@Body() paginationOrderDto: PaginationOrderDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send('findAllOrders', paginationOrderDto)
      )
      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }


  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', {id})
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }


  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusOrderDto, 
    @Query() pagination: PaginationDto
  ) {
    try {
      const orders = await this.client.send('findAllOrders', { 
        ...pagination ,
        status: statusDto.status
      })
      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  updateStatus(
    @Param('id', new ParseUUIDPipe) id: string,
    @Body() statusDto: StatusOrderDto
  ) {
    try {
      return this.client.send('changeOrderStatus', { 
        id,
        status: statusDto.status
      })
    } catch (error) {
      throw new RpcException(error);
    }
  }


}
