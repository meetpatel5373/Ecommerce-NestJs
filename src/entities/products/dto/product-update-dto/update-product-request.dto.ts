import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
import {
  propsProductName,
  propsProductPrice,
  propsProductQuantity,
} from 'src/shared/constants/swagger/api-property/product';
import { customValidator } from 'src/shared/validate/validator';

export class UpdateProductRequestDTO {
  @ApiPropertyOptional(propsProductName)
  @IsOptional()
  readonly name: string;

  @ApiPropertyOptional(propsProductPrice)
  @IsNotEmpty()
  @IsOptional()
  @IsNumberString()
  @customValidator()
  readonly price: string;

  @ApiPropertyOptional(propsProductQuantity)
  @IsNotEmpty()
  @IsOptional()
  @IsNumberString()
  @customValidator()
  readonly quantity: string;
}
