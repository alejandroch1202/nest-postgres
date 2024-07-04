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
  @IsString()
  @MinLength(3)
  title: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  description: string;

  @IsString()
  slug: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  stock: number;

  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsIn(['men', 'woman', 'kid', 'unisex'])
  gender: string;

  @IsString()
  @IsArray()
  @IsOptional()
  tags: string[];
}
