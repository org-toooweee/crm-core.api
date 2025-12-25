import { Inject, Injectable } from '@nestjs/common';
import { JWT_TOKEN_SERVICE, TOKEN_REPOSITORY } from '../../di-tokens/di-tokens';
import { RefreshTokenRepositoryPort } from './ports/refresh-token.repository.port';
import { JwtPayload } from './auth.types';
import { JwtTokenServicePort } from './ports/jwt-token.service.port';
import { RefreshTokenEntity } from '../../domain/refresh-token/entities/refresh-token.entity';
import { randomUUID } from 'crypto';
import {
  RefreshTokenExpiredException,
  RefreshTokenNotFoundException,
} from '../../domain/refresh-token/exceptions/auth.exceptions';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JWT_TOKEN_SERVICE)
    private readonly jwtService: JwtTokenServicePort,
    @Inject(TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
  ) {}

  async refreshTokens(token: string, payload: JwtPayload, userAgent: string) {
    const tokenFromDb = await this.refreshTokenRepository.findByToken(token);

    if (!tokenFromDb) {
      throw new RefreshTokenNotFoundException();
    }

    if (tokenFromDb.isExpired()) {
      throw new RefreshTokenExpiredException();
    }

    const tokens = await this.jwtService.generateTokens(payload);

    const refreshToken = RefreshTokenEntity.create({
      id: randomUUID(),
      token: tokens.refreshToken,
      userId: payload.sub,
      userAgent,
      expiresAt: new Date(),
    });

    await this.refreshTokenRepository.upsert(refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
