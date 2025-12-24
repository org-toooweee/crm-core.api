export interface TokensPair {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export type JwtVerifiedPayload =
  | (JwtPayload & {
      iat: string;
      exp: string;
    })
  | null;
