import { ValueObject } from '@libs/ddd';
import { emailRegex } from '@libs/constants';
import { ArgumentInvalidException } from '@libs/exceptions';

export class UserEmail extends ValueObject<string> {
  private constructor(readonly value: string) {
    super(value);
  }

  static create(candidate: string) {
    if (!emailRegex.test(candidate)) {
      throw new ArgumentInvalidException('Invalid email address');
    }

    return new UserEmail(candidate);
  }
}
