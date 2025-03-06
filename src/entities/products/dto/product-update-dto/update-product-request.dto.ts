import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
import { customValidator } from 'src/shared/validate/validator';

export class UpdateProductRequestDTO {
  @ApiPropertyOptional()
  @IsOptional()
  readonly name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  @IsNumberString()
  @customValidator()
  readonly price: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  @IsNumberString()
  @customValidator()
  readonly quantity: string;
}
