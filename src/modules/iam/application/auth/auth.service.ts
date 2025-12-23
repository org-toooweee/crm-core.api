import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepositoryPort } from '../../database/refresh-token/refresh-token.repository.port';
import { TOKEN_REPOSITORY } from '../../di-tokens/user.di-tokens';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
  ) {}

  async generateTokens() {}
}
