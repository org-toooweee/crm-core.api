import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepositoryPort } from '../../infra/refresh-token/refresh-token.repositories.port';
import { TOKEN_REPOSITORY } from '../../di-tokens/di-tokens';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
  ) {}

  async generateTokens() {}
}
