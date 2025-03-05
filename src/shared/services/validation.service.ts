import { Injectable } from '@nestjs/common';
import { regEmail, regPassword } from '../constants/helpers/regex';

@Injectable()
export class ValidationService {
  async emailValidate(email: string): Promise<boolean> {
    if (email.match(regEmail) == null) {
      return false;
    }
    return true;
  }

  async passwordValidate(password: string): Promise<boolean> {
    if (password.match(regPassword) == null) {
      return false;
    }
    return true;
  }
}
