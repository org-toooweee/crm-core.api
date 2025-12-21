import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUsersQuery } from './find-users.query';
import { PrismaService } from '@infra/prisma/prisma.service';

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler<FindUsersQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute() {
    const users = await this.prismaService.user.findMany();
    return users;
  }
}
