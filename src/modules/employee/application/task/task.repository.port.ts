import { TaskEntity } from '../../domain/task/entities/task.entity';

export interface TaskRepositoryPort {
  insert(entity: TaskEntity): Promise<void>;
  findByEmployeeId(employeeId: string): Promise<TaskEntity[]>;
}
