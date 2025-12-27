import { AggregateRoot } from '@libs/ddd';
import { CreateTaskProps, TaskProps } from '../types/task.types';

export class TaskEntity extends AggregateRoot<TaskProps> {
  private constructor(id: string, props: TaskProps) {
    super({ id, props });
  }

  static create(props: CreateTaskProps) {
    const { id, ...taskProps } = props;

    return new TaskEntity(id, taskProps);
  }

  validate() {
    const props = this.getProps();

    if (!props.assignedToId) {
      throw new Error('Invalid task: assignedToId is required');
    }

    if (!(props.startTime instanceof Date) || isNaN(props.startTime.getTime())) {
      throw new Error('Invalid startTime');
    }

    if (!(props.endTime instanceof Date) || isNaN(props.endTime.getTime())) {
      throw new Error('Invalid endTime');
    }

    if (!props.statusId) {
      throw new Error('Invalid task: statusId is required');
    }
  }
}

