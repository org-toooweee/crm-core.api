import { Inject, Injectable } from '@nestjs/common';
import { JWT_TOKEN_SERVICE, TOKEN_REPOSITORY } from '../../di-tokens/di-tokens';
import { RefreshTokenRepositoryPort } from './ports/refresh-token.repository.port';
import { JwtPayload } from './auth.types';
import { JwtTokenServicePort } from './ports/jwt-token.service.port';
import { randomUUID } from 'crypto';
import { RefreshTokenEntity } from '../../domain/auth/entities/refresh-token.entity';
import { EnvService } from '@infra/env/env.service';
import { add } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JWT_TOKEN_SERVICE)
    private readonly jwtService: JwtTokenServicePort,
    @Inject(TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
    private readonly envService: EnvService,
  ) {}

  async refreshTokens(payload: JwtPayload, userAgent: string) {
    const tokens = await this.jwtService.generateTokens(payload);

    const refreshToken = RefreshTokenEntity.create({
      id: randomUUID(),
      token: tokens.refreshToken,
      userId: payload.sub,
      userAgent: userAgent || 'unknown',
      expiresAt: new Date(
        add(new Date(), { days: this.getRefreshTokenExpiresEnv() }),
      ),
    });

    await this.refreshTokenRepository.upsert(refreshToken);

    return tokens;
  }

  private getRefreshTokenExpiresEnv() {
    return parseInt(this.envService.get('JWT_RT_EXPIRES'));
  }
}
