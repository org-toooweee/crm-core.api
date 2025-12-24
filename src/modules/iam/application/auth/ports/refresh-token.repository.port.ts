import { RefreshTokenEntity } from '../../../domain/refresh-token/entities/refresh-token.entity';

export interface RefreshTokenRepositoryPort {
  findByToken(token: string): Promise<RefreshTokenEntity | null>;
  upsert(token: RefreshTokenEntity): Promise<{ refreshToken: string }>;
  delete(token: string): Promise<{ id: string } | null>;
}
