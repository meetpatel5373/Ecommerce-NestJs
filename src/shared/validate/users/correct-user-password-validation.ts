import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from 'src/entities/users/user.service';
import { regPassword } from 'src/shared/constants/helpers/regex';
import { ValidationService } from 'src/shared/services/validation.service';

@ValidatorConstraint({ name: 'customValidator', async: true })
@Injectable()
export class CorrectUserPasswordValidation
  implements ValidatorConstraintInterface
{
  constructor(
    protected readonly userService: UserService,
    protected readonly validationService: ValidationService,
  ) {}
  async validate(value: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as object)[relatedPropertyName];

    if (value == undefined || value == '') {
      return false;
    }

    if ((await this.validationService.passwordValidate(value)) == false) {
      return false;
    }

    const userData = await this.userService.getUserByEmail(relatedValue);

    if (userData) {
      const passwordMatch = await bcrypt.compare(value, userData.password);

      if (passwordMatch == false) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    if (args.value == undefined || args.value == '') {
      return 'password is required';
    }

    if (args.value.match(regPassword) == null) {
      return 'invalid Password must be at least 8 character long and should Contain At least one Number, One Uppercase & One Special Character';
    }

    return 'incorrect password';
  }
}
