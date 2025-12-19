import { AggregateId } from '@libs/ddd';

export interface TokenProps {
  userId: AggregateId;
  token: string;
  expiresAt: Date;
}

export interface CreateTokenProps {
  id: AggregateId;
  userId: AggregateId;
  token: string;
  expiresAt: Date;
}
