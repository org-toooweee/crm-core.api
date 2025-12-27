import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './create-task.command';
import { Inject } from '@nestjs/common';
import { TASK_REPOSITORY } from '../../../../di-tokens/di-tokens';
import { TaskRepositoryPort } from '../../task.repository.port';
import { randomUUID } from 'crypto';
import { TaskEntity } from '../../../../domain/task/entities/task.entity';

@CommandHandler(CreateTaskCommand)
export class CreateTaskCommandHandler implements ICommandHandler<
  CreateTaskCommand,
  string
> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async execute(command: CreateTaskCommand) {
    const { assignedToId, startTime, endTime, statusId } = command;

    const id = randomUUID();

    const task = TaskEntity.create({
      id,
      assignedToId,
      startTime,
      endTime,
      statusId,
    });

    await this.taskRepository.insert(task);

    return id;
  }
}
