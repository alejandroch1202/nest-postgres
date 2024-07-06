import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ default: 10 })
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // Same as enableImplicitConversions: true
  limit?: number;

  @ApiProperty({ default: 0 })
  @IsOptional()
  @Type(() => Number) // Same as enableImplicitConversions: true
  offset?: number;
}
