import { AggregateId } from '@libs/ddd';

export interface RefreshTokenProps {
  userId: AggregateId;
  token: string;
  expiresAt: Date;
  userAgent: string;
}

export interface CreateRefreshTokenProps {
  id: AggregateId;
  userId: AggregateId;
  token: string;
  expiresAt: Date;
  userAgent: string;
}
