import { SetMetadata } from '@nestjs/common';

import { subjects } from './ability.factory';
import { Action } from '../enum/roles';
export const CHECK_ABILITY = 'check_ability';

export interface RequiredRule {
  action: Action;
  subject: subjects;
}
export const CheckAbility = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
