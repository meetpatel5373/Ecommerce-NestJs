import { ValidationOptions, registerDecorator } from 'class-validator';

import { Type } from '@nestjs/common';
import { UserIdValidation } from './users/user-id-validation';
import { UserEmailValidation } from './users/user-email-validation';
import { PasswordMatchValidation } from './passwords';
import { CorrectUserPasswordValidation } from './users/correct-user-password-validation';
import { ProductExistValidation } from './products/product-name-validation';
import { NonNegativeValidation } from './products/non-negative-validation';

export function customValidator(
  property?: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    let validateClass: Type;

    let prop = propertyName;

    if (property) {
      prop = propertyName + '|' + property;
    }

    switch (prop) {
      /**
       * User Validations
       */
      case 'email|userRegister':
      case 'email|userLogin':
        validateClass = UserEmailValidation;
        break;
      case 'password|email':
        validateClass = CorrectUserPasswordValidation;
        break;

      case 'userId':
        validateClass = UserIdValidation;
        break;

      /**
       * Password confirm password match Validation
       */
      case 'password|confirmPassword':
        validateClass = PasswordMatchValidation;
        break;

      /**
       * Product Validation
       */
      case 'name':
        validateClass = ProductExistValidation;
        break;

      case 'price':
        validateClass = NonNegativeValidation;
        break;

      case 'quantity':
        validateClass = NonNegativeValidation;
        break;

      default:
        console.log({
          validateClass,
          file: object.constructor,
          propertyName: propertyName,
          prop: prop,
        });
        break;
    }

    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: validateClass,
    });
  };
}
