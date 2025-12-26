import { Inject, Injectable } from '@nestjs/common';
import { JWT_TOKEN_SERVICE, TOKEN_REPOSITORY } from '../../di-tokens/di-tokens';
import { RefreshTokenRepositoryPort } from './ports/refresh-token.repository.port';
import { JwtPayload } from './auth.types';
import { JwtTokenServicePort } from './ports/jwt-token.service.port';
import { randomUUID } from 'crypto';
import { RefreshTokenEntity } from '../../domain/auth/entities/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JWT_TOKEN_SERVICE)
    private readonly jwtService: JwtTokenServicePort,
    @Inject(TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
  ) {}

  async refreshTokens(payload: JwtPayload, userAgent: string) {
    const tokens = await this.jwtService.generateTokens(payload);

    const refreshToken = RefreshTokenEntity.create({
      id: randomUUID(),
      token: tokens.refreshToken,
      userId: payload.sub,
      userAgent,
      expiresAt: new Date(),
    });

    await this.refreshTokenRepository.upsert(refreshToken);

    return tokens;
  }
}
