import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsPositive,
  Min,
  MinLength,
  IsString,
  ValidateNested,
} from 'class-validator';

class CreateOrderItemDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  @MinLength(2)
  fullName: string;

  @IsString()
  @MinLength(5)
  phone: string;

  @IsString()
  @MinLength(5)
  address: string;

  @IsIn(['courier', 'pickup'])
  deliveryMethod: 'courier' | 'pickup';

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
