import { PasswordHashPort } from './password-hash.port';
import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordHash implements PasswordHashPort {
  async hash(password: string) {
    return argon.hash(password);
  }

  async compare(hash: string, password: string) {
    return argon.verify(hash, password);
  }
}
