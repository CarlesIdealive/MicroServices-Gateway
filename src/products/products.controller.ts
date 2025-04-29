import { 
  Body,
  Controller, 
  Delete, 
  Get, 
  Inject, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post, 
  Query
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';


@Controller('products')
export class ProductsController {

  constructor(
    //Ms Using
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ){}


  @Post()
  createProduct(
    @Body() createProductDto:CreateProductDto
  ){
    return this.productsClient.send({ cmd: 'create'}, createProductDto)
      .pipe(
        catchError((error) => { throw new RpcException(error); })
      );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto){
    return this.productsClient.send({ cmd: 'find_all'}, paginationDto);
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number){
    //Opcio1 - Treballem amb OBSERVABLES
    return this.productsClient.send({ cmd: 'find_one'}, {id})
      .pipe(
        catchError((error) => { throw new RpcException(error); })
      );

    //Opcio 2 - Treballem amb PROMISES
    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({cmd: 'find_one'}, {id})
    //   );
    //   return product;

    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body:UpdateProductDto
  ){
    return this.productsClient.send({ cmd: 'update'}, {
      id, 
      ...body
    }).pipe(
      catchError((error) => { throw new RpcException(error); })
    )
  }

  
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number){
    return this.productsClient.send({ cmd: 'remove'}, {id})
      .pipe(
        catchError((error) => { throw new RpcException(error); })
      )
  }


}
