import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';
import { Inject } from '@nestjs/common';
import {
  PASSWORD_SERVICE,
  TOKEN_REPOSITORY,
  USER_REPOSITORY,
} from '../../../../di-tokens/di-tokens';
import { UserAlreadyExistsException } from '../../../../domain/user/exceptions/user.exceptions';
import { UserEntity } from '../../../../domain/user/entities/user.entity';
import { randomUUID } from 'crypto';
import { RefreshTokenEntity } from '../../../../domain/refresh-token/entities/refresh-token.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryPort } from '../../../user/ports/user.repository.port';
import { RefreshTokenRepositoryPort } from '../../ports/refresh-token.repository.port';
import { PasswordServicePort } from '../../ports/password-service.port';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
    @Inject(PASSWORD_SERVICE)
    private readonly passwordHash: PasswordServicePort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RegisterCommand) {
    const { email, password } = command;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    const userId = randomUUID();
    console.log('userId', userId);
    const hashedPassword = await this.passwordHash.hash(password);

    const userEntity = UserEntity.create({
      id: userId,
      email,
      password: hashedPassword,
    });

    console.log(userEntity);

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

    console.log(refreshTokenEntity);

    await this.refreshTokenRepository.upsert(refreshTokenEntity);

    const payload = {
      sub: userId,
      email,
      role: userEntity.getProps().role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      refreshToken: refreshTokenEntity.getProps().token,
    };
  }
}
