import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FindTaskStatusesQuery } from './find-task-statuses.query';
import { PrismaService } from '@infra/prisma/prisma.service';
import { TaskStatusPersistenceMapper } from '../../../../infra/mappers/task-status.persistence.mapper';

@QueryHandler(FindTaskStatusesQuery)
export class FindTaskStatusesQueryHandler implements IQueryHandler<
  FindTaskStatusesQuery,
  { id: string; name: string }[]
> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapper: TaskStatusPersistenceMapper,
  ) {}

  async execute() {
    const statuses = await this.prismaService.taskStatus.findMany();
    return statuses.map((s) => {
      const domain = this.mapper.toDomain(s);
      const p = domain.getProps();
      return { id: domain.id, name: p.name };
    });
  }
}
