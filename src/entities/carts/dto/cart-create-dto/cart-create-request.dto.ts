import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  propsProductId,
  propsProductQuantity,
} from 'src/shared/constants/swagger/api-property/product';
import { customValidator } from 'src/shared/validate/validator';

export class CartCreateRequestDTO {
  @ApiProperty(propsProductId)
  @customValidator('quantity')
  readonly product_id: string;

  @ApiProperty(propsProductQuantity)
  @IsNotEmpty()
  @IsNumber()
  @customValidator()
  readonly quantity: number;
}
