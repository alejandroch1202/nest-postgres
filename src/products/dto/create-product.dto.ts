import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title',
    example: 'Product 1',
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'Product price',
    example: 10.99,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Product description',
    example: 'This is a product description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Product slug',
    example: 'product-1',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'Product stock',
    example: 10,
  })
  @IsNumber()
  @IsInt()
  @IsPositive()
  stock: number;

  @ApiProperty({
    description: 'Product sizes',
    example: ['S', 'M', 'L'],
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    description: 'Product gender',
    example: 'men',
  })
  @IsString()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    description: 'Product tags',
    example: ['tag1', 'tag2'],
  })
  @IsString()
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty({
    description: 'Product images',
    example: ['image1.jpg', 'image2.jpg'],
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[];
}
