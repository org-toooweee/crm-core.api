import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { AuthService } from '../../auth.service';
import { JwtPayload, TokensPair } from '../../auth.types';
import { UserRepositoryPort } from '../../../user/ports/user.repository.port';
import { Inject } from '@nestjs/common';
import {
  PASSWORD_SERVICE,
  USER_REPOSITORY,
} from '../../../../di-tokens/di-tokens';
import { PasswordServicePort } from '../../ports/password-service.port';
import { InvalidCredentialsException } from '../../../../domain/auth/exceptions/auth.exceptions';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<
  LoginCommand,
  TokensPair
> {
  constructor(
    private readonly authService: AuthService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: PasswordServicePort,
  ) {}

  async execute(command: LoginCommand) {
    const { email, password, useragent } = command;

    const user = await this.userRepository.findByEmail(email);

    if (
      !user ||
      !(await this.passwordService.compare(user.getProps().password, password))
    ) {
      throw new InvalidCredentialsException();
    }

    const payload: JwtPayload = {
      sub: user.id,
      email,
      role: user.getProps().role.value,
    };

    return await this.authService.refreshTokens(payload, useragent);
  }
}
