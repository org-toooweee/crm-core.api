import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUsersQuery } from './find-users.query';
import { PrismaService } from '@infra/prisma/prisma.service';
import { UserReadModel } from './user.read-model';

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler<
  FindUsersQuery,
  UserReadModel[]
> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
