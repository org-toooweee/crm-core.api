import { Mapper } from '@libs/ddd';
import { UserEntity } from '../domain/user/entities/user.entity';
import { UserResponseDto } from '../dtos/user/user-response.dto';
import { Prisma, Role } from '../../../../generated/prisma/client';

type UserDBRecord = Prisma.UserGetPayload<object>;

export class UserMapper implements Mapper<
  UserEntity,
  UserDBRecord,
  UserResponseDto
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

  toResponse(entity: UserEntity): UserResponseDto {
    const props = entity.getProps();
    const response = new UserResponseDto(props);
    response.email = props.email.value;
    response.role = props.email.value;
    response.createdAt = props.createdAt.toString();
    response.updatedAt = props.updatedAt.toString();
    return response;
  }
}
