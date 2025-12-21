import { Entity } from '@libs/ddd/entity';

export interface Mapper<
  DomainEntity extends Entity<any>,
  DBRecord,
  Response = any,
> {
  toPersistence(entity: DomainEntity): DBRecord;
  toDomain(record: any): DomainEntity;
  toResponse(entity: DomainEntity): Response;
}
