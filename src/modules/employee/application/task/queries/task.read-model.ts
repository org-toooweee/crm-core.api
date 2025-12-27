export type TaskReadModel = {
  id: string;
  assignedToId: string;
  startTime: Date;
  endTime: Date;
  statusId: string;
  createdAt: Date;
  updatedAt: Date;
};