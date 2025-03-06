import { Injectable } from '@nestjs/common';
import { Action } from '../enum/roles';
import {
  PureAbility,
  InferSubjects,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { User } from 'src/entities/users/user.entity';
import { Product } from 'src/entities/products/product.entity';
import { Cart } from 'src/entities/carts/cart.entity';

export type subjects =
  | InferSubjects<typeof User>
  | InferSubjects<typeof Product>
  | InferSubjects<typeof Cart>
  | 'all';

export type AppAbility = PureAbility<[Action, subjects]>;

@Injectable()
export class AppAbilityFactory {
  async defineAbilityFor(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );
    /**
     *
     *? Notes for better understanding ---
     **
     *? Actions
     ** Manage Refers to Create, Update, Read, Delete (All Level of the access)
     ** Create : Create Access
     ** Update : Edit Access
     ** Read   : Read Access
     ** Delete : Delete Access
     **
     *? Subjects
     ** All (Access to every module)
     **
     *? Access Permission
     ** Can : Used to give access to module
     ** Cannot : Used to remove access to the module
     *
     */

    if (user.role == '1') {
      can(Action.Manage, 'all'); // Full access to everything
    } else {
      can(Action.Read, Product);
      cannot(Action.Update, Product);
      cannot(Action.Create, Product);
      cannot(Action.Delete, Product);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<subjects>,
    });
  }
}
