import { Inject, Injectable } from '@nestjs/common';
import { JWT_TOKEN_SERVICE, TOKEN_REPOSITORY } from '../../di-tokens/di-tokens';
import { RefreshTokenRepositoryPort } from './ports/refresh-token.repository.port';
import { JwtPayload } from './auth.types';
import { JwtTokenServicePort } from './ports/jwt-token.service.port';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JWT_TOKEN_SERVICE)
    private readonly jwtService: JwtTokenServicePort,
    @Inject(TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
  ) {}

  async refreshTokens(payload: JwtPayload) {
    const tokens = await this.jwtService.generateTokens(payload);
  }
}
