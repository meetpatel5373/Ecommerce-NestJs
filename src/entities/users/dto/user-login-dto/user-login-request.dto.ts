import { ApiProperty } from '@nestjs/swagger';
import {
  propsUserEmail,
  propsUserPassword,
} from 'src/shared/constants/swagger/api-property/user';
import { customValidator } from 'src/shared/validate/validator';

export class UserLoginRequestDTO {
  @ApiProperty(propsUserEmail)
  @customValidator('userLogin')
  readonly email: string;

  @ApiProperty(propsUserPassword)
  @customValidator('email')
  readonly password: string;
}
