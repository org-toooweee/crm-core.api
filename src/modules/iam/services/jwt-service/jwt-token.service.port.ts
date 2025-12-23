export interface JwtTokenServicePort {
  generateTokens(): Promise<>;
  verifyToken(token: string): Promise<>;
}
