import { ApiProperty } from '@nestjs/swagger';
import {
  propsFirstCreatedAt,
  propsLastModifiedAt,
  propsPrimaryKey,
} from 'src/shared/constants/swagger/api-property/default';
import {
  propsDisplayName,
  propsUserEmail,
  propsUserName,
} from 'src/shared/constants/swagger/api-property/user';

import { User } from '../user.entity';

export class UserDTO {
  @ApiProperty(propsPrimaryKey)
  readonly id: number;

  @ApiProperty(propsUserName)
  readonly role: string;

  @ApiProperty(propsUserName)
  readonly firstName: string;

  @ApiProperty(propsUserName)
  readonly lastName: string;

  @ApiProperty(propsDisplayName)
  readonly displayName: string;

  @ApiProperty(propsUserEmail)
  readonly email: string;

  @ApiProperty(propsFirstCreatedAt)
  readonly createdAt: Date;

  @ApiProperty(propsLastModifiedAt)
  readonly updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.role = user.role;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.displayName = user.display_name;
    this.email = user.email;
    this.createdAt = user.created_at;
    this.createdAt = user.created_at;
    this.updatedAt = user.updated_at;
  }
}
