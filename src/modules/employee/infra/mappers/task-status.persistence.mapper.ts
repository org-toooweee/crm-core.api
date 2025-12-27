import { PersistenceMapper } from '@libs/ddd';
import { Prisma } from '@prisma-client/client';
import { TaskStatusEntity } from '../../domain/task/entities/task-status.entity';

type TaskStatusDBRecord = Prisma.TaskStatusGetPayload<object>;

export class TaskStatusPersistenceMapper implements PersistenceMapper<TaskStatusEntity, TaskStatusDBRecord> {
  toPersistence(entity: TaskStatusEntity): TaskStatusDBRecord {
    const p = entity.getProps();

    return {
      id: entity.id,
      name: p.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as TaskStatusDBRecord;
  }

  toDomain(record: TaskStatusDBRecord): TaskStatusEntity {
    return TaskStatusEntity.create(record.id, record.name);
  }
}
