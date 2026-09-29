import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './../common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth('user') //This route required the role: user
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  //This is the path: http://localhost:3000/api/products?limit=2&offset=4
  @Get()  //This route is opened.
  findAll( @Query() paginationDto:PaginationDto ) {
    // console.log(paginationDto)
    return this.productsService.findAll( paginationDto );
  }

  @Get(':term') //This route is opened.
  findOne(@Param( 'term' ) term: string) {
    return this.productsService.findOnePlain( term );
  }

  @Patch(':id')
  @Auth('admin') //This route required the role: admin
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update( id, updateProductDto );
  }

  @Delete(':id')
  @Auth('admin') //This route required the role: admin
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.productsService.remove( id );
  }
}
