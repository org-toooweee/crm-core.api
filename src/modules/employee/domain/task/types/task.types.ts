import { AggregateId } from '@libs/ddd';

export interface TaskProps {
  assignedToId: AggregateId;
  startTime: Date;
  endTime: Date;
  statusId: string;
}

export interface CreateTaskProps {
  id: string;
  assignedToId: string;
  startTime: Date;
  endTime: Date;
  statusId: string;
}
