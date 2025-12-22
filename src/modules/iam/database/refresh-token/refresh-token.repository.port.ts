import { RefreshTokenEntity } from '../../domain/refresh-token/entities/refresh-token.entity';

export interface RefreshTokenRepositoryPort {
  findByToken(): Promise<RefreshTokenEntity | null>;
  upsert(): Promise<string>;
  delete(): Promise<string>;
}
