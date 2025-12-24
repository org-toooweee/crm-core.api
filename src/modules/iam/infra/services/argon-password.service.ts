import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';
import { PasswordServicePort } from '../../application/auth/ports/password-service.port';

@Injectable()
export class ArgonPasswordService implements PasswordServicePort {
  async hash(password: string) {
    return argon.hash(password);
  }

  async compare(hash: string, password: string) {
    return argon.verify(hash, password);
  }
}
