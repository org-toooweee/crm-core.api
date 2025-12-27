import { PersistenceMapper } from '@libs/ddd';
import { Prisma } from '@prisma-client/client';
import { TaskEntity } from '../../domain/task/entities/task.entity';
import { CreateTaskProps } from '../../domain/task/types/task.types';

type TaskDBRecord = Prisma.TaskGetPayload<object>;

export class TaskPersistenceMapper implements PersistenceMapper<TaskEntity, TaskDBRecord> {
  toPersistence(entity: TaskEntity): TaskDBRecord {
    const p = entity.getProps();

    return {
      id: entity.id,
      assignedToId: p.assignedToId,
      startTime: p.startTime,
      endTime: p.endTime,
      statusId: p.statusId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as TaskDBRecord;
  }

  toDomain(record: TaskDBRecord): TaskEntity {
    return TaskEntity.create({
      id: record.id,
      assignedToId: record.assignedToId,
      startTime: record.startTime,
      endTime: record.endTime,
      statusId: record.statusId,
    } as CreateTaskProps);
  }
}
