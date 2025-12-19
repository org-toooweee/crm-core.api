import { ValueObject } from '@libs/ddd';
import { ArgumentInvalidException } from '@libs/exceptions';
import { UserRoles } from '../types/user.types';

export class UserRole extends ValueObject<string> {
  private constructor(readonly value: string) {
    super(value);
  }

  static create(candidate: string) {
    if (!candidate) {
      throw new ArgumentInvalidException('Role cannot be empty');
    }

    const isRoleValid = Object.values(UserRoles).includes(
      candidate as UserRoles,
    );

    if (!isRoleValid) {
      throw new ArgumentInvalidException('Invalid role');
    }

    return new UserRole(candidate);
  }

  isAdmin() {
    return (this.getValue() as UserRoles) === UserRoles.admin;
  }
}
