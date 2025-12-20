import { Entity } from '@libs/ddd/entity';

export interface PersistenceMapper<DomainEntity extends Entity<any>, DBRecord> {
  toPersistence(entity: DomainEntity): DBRecord;
  toDomain(record: any): DomainEntity;
}
