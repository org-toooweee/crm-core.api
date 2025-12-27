import { Inject } from '@nestjs/common';
import {
  TOKEN_REPOSITORY,
  USER_REPOSITORY,
} from '../../../../di-tokens/di-tokens';
import { RefreshTokenRepository } from '../../../../infra/repositories';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshCommand } from './refresh.command';
import { RefreshTokenExpiredException } from '../../../../domain/auth/exceptions/auth.exceptions';
import { AuthService } from '../../auth.service';
import { JwtPayload, TokensPair } from '../../auth.types';
import { UserRepositoryPort } from '../../../user/ports/user.repository.port';

@CommandHandler(RefreshCommand)
export class RefreshCommandHandler implements ICommandHandler<
  RefreshCommand,
  TokensPair
> {
  constructor(
    @Inject(TOKEN_REPOSITORY)
    private readonly tokenRepository: RefreshTokenRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    private readonly authService: AuthService,
  ) {}

  async execute(command: RefreshCommand) {
    if (!command.token) {
      throw new RefreshTokenExpiredException();
    }

    const tokenFromDb = await this.tokenRepository.findByToken(command.token);

    if (!tokenFromDb || tokenFromDb.isExpired()) {
      throw new RefreshTokenExpiredException();
    }

    const tokenProps = tokenFromDb.getProps();

    const user = await this.userRepository.findById(tokenProps.userId);

    if (!user) {
      throw new RefreshTokenExpiredException();
    }

    const payload: JwtPayload = {
      sub: tokenProps.userId,
      email: user.getProps().email.value,
      role: user.getProps().role.value,
    };

    return this.authService.refreshTokens(
      payload,
      tokenFromDb.getProps().userAgent,
    );
  }
}
