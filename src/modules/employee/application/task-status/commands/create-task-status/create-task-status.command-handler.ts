import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskStatusCommand } from './create-task-status.command';
import { randomUUID } from 'crypto';
import { Inject } from '@nestjs/common';
import { TASK_STATUS_REPOSITORY } from '../../../../di-tokens/di-tokens';
import { TaskStatusRepositoryPort } from '../../task-status.repository.port';

@CommandHandler(CreateTaskStatusCommand)
export class CreateTaskStatusCommandHandler implements ICommandHandler<
  CreateTaskStatusCommand,
  string
> {
  constructor(
    @Inject(TASK_STATUS_REPOSITORY)
    private readonly taskStatusRepository: TaskStatusRepositoryPort,
  ) {}

  async execute(command: CreateTaskStatusCommand) {
    const id = randomUUID();

    const { TaskStatusEntity } = await import('../../../../domain/task/entities/task-status.entity');

    const status = TaskStatusEntity.create(id, command.name);

    await this.taskStatusRepository.insert(status);

    return id;
  }
} 
