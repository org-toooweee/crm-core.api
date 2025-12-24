import { TokensPair, JwtPayload, JwtVerifiedPayload } from '../auth.types';

export interface JwtTokenServicePort {
  generateTokens(payload: JwtPayload): Promise<TokensPair>;
  verifyToken(token: string): Promise<JwtVerifiedPayload>;
}
