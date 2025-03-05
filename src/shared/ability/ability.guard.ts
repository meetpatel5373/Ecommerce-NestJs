import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbilityFactory } from './ability.factory';
import { CHECK_ABILITY, RequiredRule } from './ability.decorator';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AppAbilityFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const request = context.switchToHttp().getRequest();

    const ability = await this.caslAbilityFactory
      .defineAbilityFor
      // request.user,
      ();

    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability)
          .setMessage('Unauthorized Access')
          .throwUnlessCan(rule.action, rule.subject),
      );

      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException('Unauthorized Access');
      }
    }
  }
}
