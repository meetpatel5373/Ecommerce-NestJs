import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Validate } from 'class-validator';
import { customValidator } from 'src/shared/validate/validator';

export class ProductCreateRequestDTO {
  @ApiProperty()
  @customValidator()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @customValidator()
  readonly price: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @customValidator()
  readonly quantity: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  readonly image?: Express.Multer.File;
}
