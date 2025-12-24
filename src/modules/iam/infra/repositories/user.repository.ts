import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { UserEntity } from '../../domain/user/entities/user.entity';
import { Role } from '@prisma-client/enums';
import { UserRepositoryPort } from '../../application/user/ports/user.repository.port';
import { UserPersistenceMapper } from '../mappers/user.persistence.mapper';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapper: UserPersistenceMapper,
  ) {}

  async insert(entity: UserEntity) {
    const props = entity.getProps();
    const role = props.role.value as Role;

    await this.prismaService.user.create({
      data: {
        id: props.id,
        email: props.email.getValue(),
        password: props.password,
        role,
      },
    });
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();

    return users.map((user) => {
      return this.mapper.toDomain(user);
    });
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return this.mapper.toDomain(user);
  }
}
