import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // Same as enableImplicitConversions: true
  limit?: number;

  @IsOptional()
  @Type(() => Number) // Same as enableImplicitConversions: true
  offset?: number;
}
