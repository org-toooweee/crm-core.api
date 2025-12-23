import { Injectable } from '@nestjs/common';
import { JwtTokenServicePort } from './jwt-token.service.port';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements JwtTokenServicePort {
  constructor(private readonly jwtService: JwtService) {}
}
