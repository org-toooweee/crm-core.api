import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';
import { Inject } from '@nestjs/common';
import {
  PASSWORD_HASH,
  TOKEN_REPOSITORY,
  USER_REPOSITORY,
} from '../../../../di-tokens/user.di-tokens';
import { UserRepositoryPort } from '../../../../database/user/user.repository.port';
import { UserAlreadyExistsException } from '../../../../domain/user/exceptions/user.exceptions';
import { PasswordHashPort } from '../../../../infra/password-hash/password-hash-port';
import { RefreshTokenRepositoryPort } from '../../../../database/refresh-token/refresh-token.repository.port';
import { UserEntity } from '../../../../domain/user/entities/user.entity';
import { randomUUID } from 'crypto';
import { RefreshTokenEntity } from '../../../../domain/refresh-token/entities/refresh-token.entity';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
    @Inject(PASSWORD_HASH)
    private readonly passwordHash: PasswordHashPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RegisterCommand) {
    const { email, password } = command;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    const userId = randomUUID();
    const hashedPassword = await this.passwordHash.hash(password);

    const userEntity = UserEntity.create({
      id: userId,
      email,
      password: hashedPassword,
    });

    await this.userRepository.insert(userEntity);

    const refreshTokenId = randomUUID();
    const refreshToken = randomUUID();

    const refreshTokenEntity = RefreshTokenEntity.create({
      id: refreshTokenId,
      token: refreshToken,
      userId: userEntity.id,
      userAgent: 'a',
      expiresAt: new Date(),
    });

    await this.refreshTokenRepository.upsert(refreshTokenEntity);

    return {
      refreshToken: refreshTokenEntity.getProps().token,
    };
  }
}
