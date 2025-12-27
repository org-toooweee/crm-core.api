import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { TaskStatusRepositoryPort } from '../../../application/task-status/task-status.repository.port';
import { TaskStatusPersistenceMapper } from '../../mappers/task-status.persistence.mapper';
import { TaskStatusEntity } from '../../../domain/task/entities/task-status.entity';

@Injectable()
export class TaskStatusRepository implements TaskStatusRepositoryPort {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapper: TaskStatusPersistenceMapper,
  ) {}

  async insert(entity: TaskStatusEntity) {
    const data = this.mapper.toPersistence(entity);

    await this.prismaService.taskStatus.create({
      data: { id: data.id, name: data.name },
    });
  }

  async findAll() {
    const records = await this.prismaService.taskStatus.findMany();
    return records.map((r) => this.mapper.toDomain(r));
  }

  async findById(id: string) {
    const record = await this.prismaService.taskStatus.findUnique({
      where: { id },
    });
    if (!record) return null;
    return this.mapper.toDomain(record);
  }
}
