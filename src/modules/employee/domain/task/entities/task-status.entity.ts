import { AggregateRoot } from '@libs/ddd';

export interface TaskStatusProps {
  name: string;
}

export class TaskStatusEntity extends AggregateRoot<TaskStatusProps> {
  private constructor(id: string, props: TaskStatusProps) {
    super({ id, props });
  }

  static create(id: string, name: string) {
    return new TaskStatusEntity(id, { name });
  }

  validate() {
    const p = this.getProps();

    if (!p.name) {
      throw new Error('TaskStatus name is required');
    }
  }
}

