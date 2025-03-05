import { UserDTO } from '../user.dto';
import { User } from '../../user.entity';

export class GetUserByIdResponseDTO extends UserDTO {
  constructor(user: User) {
    super(user);
  }
}
