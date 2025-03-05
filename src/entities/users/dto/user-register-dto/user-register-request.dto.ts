import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import {
  propsFirstName,
  propsLastName,
  propsUserConfirmPassword,
  propsUserEmail,
  propsUserPassword,
  propsUserRole,
} from 'src/shared/constants/swagger/api-property/user';
import { Roles } from 'src/shared/enum/roles';
import { customValidator } from 'src/shared/validate/validator';

export class UserRegisterRequestDTO {
  @ApiProperty(propsFirstName)
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty(propsLastName)
  readonly lastName: string;

  @ApiProperty(propsUserEmail)
  @customValidator('userRegister')
  readonly email: string;

  @ApiProperty(propsUserPassword)
  @customValidator('confirmPassword')
  readonly password: string;

  @ApiProperty(propsUserConfirmPassword)
  @IsNotEmpty()
  readonly confirmPassword: string;

  @ApiProperty(propsUserRole)
  @IsEnum(Roles)
  @IsOptional()
  readonly role: Roles;
}
