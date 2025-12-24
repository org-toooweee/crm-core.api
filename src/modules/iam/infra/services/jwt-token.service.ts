import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenServicePort } from '../../application/auth/ports/jwt-token.service.port';
import {
  JwtPayload,
  JwtVerifiedPayload,
} from '../../application/auth/auth.types';
import { randomUUID } from 'crypto';

@Injectable()
export class JwtTokenService implements JwtTokenServicePort {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = randomUUID();

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(token: string): Promise<JwtVerifiedPayload> {
    return this.jwtService.verifyAsync<JwtVerifiedPayload>(token);
  }
}
