export class CreateTaskCommand {
  constructor(
    public readonly assignedToId: string,
    public readonly startTime: Date,
    public readonly endTime: Date,
    public readonly statusId: string,
  ) {}
}
