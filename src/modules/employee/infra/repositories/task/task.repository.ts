import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { TaskRepositoryPort } from '../../../application/task/task.repository.port';
import { TaskPersistenceMapper } from '../../mappers/task.persistence.mapper';
import { TaskEntity } from '../../../domain/task/entities/task.entity';

@Injectable()
export class TaskRepository implements TaskRepositoryPort {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapper: TaskPersistenceMapper,
  ) {}

  async insert(entity: TaskEntity) {
    const data = this.mapper.toPersistence(entity);

    await this.prismaService.task.create({
      data: {
        id: data.id,
        assignedToId: data.assignedToId,
        startTime: data.startTime,
        endTime: data.endTime,
        statusId: data.statusId,
      },
    });
  }

  async findByEmployeeId(employeeId: string) {
    const records = await this.prismaService.task.findMany({
      where: { assignedToId: employeeId },
    });

    return records.map((r) => this.mapper.toDomain(r));
  }
}
