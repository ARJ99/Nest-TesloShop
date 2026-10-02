//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}

// ## Useful related variants

// - PartialType → all fields optional (for `UPDATE`/`PATCH`)
// - PickType(CreateProductDto, ['name', 'price']) → only selected fields optional
// - OmitType(CreateProductDto, ['name']) → all fields except the omitted ones
// - IntersectionType(A, B) → merge multiple DTOs
