import { RefreshTokenEntity } from '../../../domain/auth/entities/refresh-token.entity';

export interface RefreshTokenRepositoryPort {
  findByToken(token: string): Promise<RefreshTokenEntity | null>;
  upsert(token: RefreshTokenEntity): Promise<RefreshTokenEntity>;
  delete(token: string, useragent: string): Promise<{ id: string } | null>;
}
