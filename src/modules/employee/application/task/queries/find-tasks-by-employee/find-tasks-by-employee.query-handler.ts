import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FindTasksByEmployeeQuery } from './find-tasks-by-employee.query';
import { PrismaService } from '@infra/prisma/prisma.service';
import { TaskReadModel } from '../task.read-model';
import { TaskPersistenceMapper } from '../../../../infra/mappers/task.persistence.mapper';

@QueryHandler(FindTasksByEmployeeQuery)
export class FindTasksByEmployeeQueryHandler implements IQueryHandler<
  FindTasksByEmployeeQuery,
  TaskReadModel[]
> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapper: TaskPersistenceMapper,
  ) {}

  async execute(query: FindTasksByEmployeeQuery) {
    const tasks = await this.prismaService.task.findMany({
      where: { assignedToId: query.employeeId },
    });

    return tasks.map((t) => {
      const domain = this.mapper.toDomain(t);
      const p = domain.getProps();

      return {
        id: domain.id,
        assignedToId: p.assignedToId,
        startTime: p.startTime,
        endTime: p.endTime,
        statusId: p.statusId,
        createdAt: domain.createdAt,
        updatedAt: domain.updatedAt,
      } as TaskReadModel;
    });
  }
}
