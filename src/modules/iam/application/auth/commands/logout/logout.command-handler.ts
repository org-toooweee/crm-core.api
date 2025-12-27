import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LogoutCommand } from './logout.command';
import { TOKEN_REPOSITORY } from '../../../../di-tokens/di-tokens';
import { Inject } from '@nestjs/common';
import { RefreshTokenRepositoryPort } from '../../ports/refresh-token.repository.port';
import { RefreshTokenExpiredException } from '../../../../domain/auth/exceptions/auth.exceptions';

@CommandHandler(LogoutCommand)
export class LogoutCommandHandler implements ICommandHandler<LogoutCommand> {
  constructor(
    @Inject(TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
  ) {}

  async execute(command: LogoutCommand) {
    const { token } = command;

    if (!token) {
      return {
        success: true,
      };
    }

    const tokenFromBb = await this.refreshTokenRepository.findByToken(token);

    if (!tokenFromBb) {
      return {
        success: true,
      };
    }

    await this.refreshTokenRepository.delete(
      token,
      tokenFromBb.getProps().userAgent,
    );

    return {
      success: true,
    };
  }
}
