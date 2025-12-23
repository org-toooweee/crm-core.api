import { AggregateId, AggregateRoot } from '@libs/ddd';
import { CreateUserProps, UserProps, UserRoles } from '../types/user.types';
import { UserEmail } from '../value-objects/user-email.vo';
import { UserRole } from '../value-objects/user-role.vo';

export class UserEntity extends AggregateRoot<UserProps> {
  private constructor(id: AggregateId, props: UserProps) {
    super({ id, props });
  }

  static create(props: CreateUserProps) {
    const email = UserEmail.create(props.email);
    const role = UserRole.create(props.role || UserRoles.user);

    const { id, password } = props;

    const user = new UserEntity(id, {
      email,
      role,
      password,
    });

    return user;
  }

  validate() {}
}
