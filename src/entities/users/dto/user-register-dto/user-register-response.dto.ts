import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from '../user.dto';
import { User } from '../../user.entity';
import {
  propsJwtToken,
  propsRefreshJwtToken,
} from 'src/shared/constants/swagger/api-property/default';

export class UserRegisterResponseDTO extends UserDTO {
  @ApiProperty(propsJwtToken)
  token: string;

  @ApiProperty(propsRefreshJwtToken)
  refreshToken: string;

  constructor(user: User, token?: string, refreshToken?: string) {
    super(user);
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
