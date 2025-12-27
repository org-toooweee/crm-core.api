import { RepositoryPort } from '@libs/ddd';
import { TaskStatusEntity } from '../../domain/task/entities/task-status.entity';

export interface TaskStatusRepositoryPort extends RepositoryPort<TaskStatusEntity> {
  insert(data: TaskStatusEntity | { id: string; name: string }): Promise<void>;
  findAll(): Promise<TaskStatusEntity[]>;
  findById(id: string): Promise<TaskStatusEntity | null>;
}
