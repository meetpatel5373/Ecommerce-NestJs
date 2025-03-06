import { ApiProperty } from '@nestjs/swagger';
import { customValidator } from 'src/shared/validate/validator';

export class DeleteAdminRequestDTO {
  @ApiProperty()
  @customValidator()
  readonly adminId: string;
}
