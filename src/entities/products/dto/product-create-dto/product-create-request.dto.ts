import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import {
  propsProductName,
  propsProductPrice,
  propsProductQuantity,
} from 'src/shared/constants/swagger/api-property/product';
import { customValidator } from 'src/shared/validate/validator';

export class ProductCreateRequestDTO {
  @ApiProperty(propsProductName)
  @customValidator()
  readonly name: string;

  @ApiProperty(propsProductPrice)
  @IsNotEmpty()
  @IsNumberString()
  @customValidator()
  readonly price: string;

  @ApiProperty(propsProductQuantity)
  @IsNotEmpty()
  @IsNumberString()
  @customValidator()
  readonly quantity: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  readonly image?: Express.Multer.File;
}
