import { PersistenceMapper } from '@libs/ddd';
import { Prisma, Role } from '@prisma-client/client';
import { UserEntity } from '../../domain/user/entities/user.entity';

type UserDBRecord = Prisma.UserGetPayload<object>;

export class UserPersistenceMapper implements PersistenceMapper<
  UserEntity,
  UserDBRecord
> {
  toPersistence(entity: UserEntity): UserDBRecord {
    const role = entity.getProps().role.value as Role;

    return {
      id: entity.id,
      email: entity.getProps().email.value,
      password: entity.getProps().password,
      role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDomain(record: UserDBRecord): UserEntity {
    return UserEntity.create({
      id: record.id,
      email: record.email,
      password: record.password,
      role: record.role,
    });
  }
}
