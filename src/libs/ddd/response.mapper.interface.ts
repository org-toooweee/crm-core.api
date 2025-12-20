import { Entity } from '@libs/ddd/entity';

export interface ResponseMapper<
  DomainEntity extends Entity<any>,
  Response = any,
> {
  toResponse(entity: DomainEntity): Response;
}
