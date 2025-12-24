import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenServicePort } from '../../application/auth/ports/jwt-token.service.port';

@Injectable()
export class JwtTokenService implements JwtTokenServicePort {
  constructor(private readonly jwtService: JwtService) {}
}
