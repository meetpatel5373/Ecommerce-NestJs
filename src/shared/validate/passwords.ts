import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { regPassword } from 'src/shared/constants/helpers/regex';

import { ValidationService } from 'src/shared/services/validation.service';

@ValidatorConstraint({ name: 'customValidator', async: true })
@Injectable()
export class PasswordMatchValidation implements ValidatorConstraintInterface {
  constructor(protected readonly validationService: ValidationService) {}
  async validate(value: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as object)[relatedPropertyName];

    if (value == undefined || value == '') {
      return false;
    }

    if ((await this.validationService.passwordValidate(value)) == false) {
      return false;
    }

    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    if (args.value == undefined || args.value == '') {
      return 'password is required';
    }

    if (args.value.match(regPassword) == null) {
      return 'invalid Password must be at least 8 character long and should Contain At least one Number, One Uppercase & One Special Character';
    }

    return 'password and confirmPassword did not match';
  }
}
