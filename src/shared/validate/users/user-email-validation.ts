import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from 'src/entities/users/user.service';
import { regEmail } from 'src/shared/constants/helpers/regex';
import { ValidationService } from 'src/shared/services/validation.service';

@ValidatorConstraint({ name: 'customValidator', async: true })
@Injectable()
export class UserEmailValidation implements ValidatorConstraintInterface {
  constructor(
    protected readonly userService: UserService,
    protected readonly validationService: ValidationService,
  ) {}
  async validate(value: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;

    if (value == undefined || value == '') {
      return false;
    }

    if ((await this.validationService.emailValidate(value)) == false) {
      return false;
    }

    switch (relatedPropertyName) {
      case 'userRegister':
        // email already in use
        return (await this.userService.getUserByEmail(value)) == null;
      case 'userLogin':
        // email not found
        return (await this.userService.getUserByEmail(value)) != null;
      default:
        return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;

    if (args.value == undefined || args.value == '') {
      return 'email is required';
    }

    if (args.value.match(regEmail) == null) {
      return 'invalid email';
    }

    switch (relatedPropertyName) {
      case 'userRegister':
        return 'email already in use';
      case 'userLogin':
        return 'user not found';
      default:
        return 'something went wrong with email';
    }
  }
}
