import { Body, Controller, Get, Post, Param, UseFilters } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskDto } from './dto/task/create-task.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BaseExceptionsFilter } from '@infra/exception-filters/base-exceptions.filter';
import { CreateTaskCommand } from '../application/task/commands/create-task/create-task.command';
import { FindTasksByEmployeeQuery } from '../application/task/queries/find-tasks-by-employee/find-tasks-by-employee.query';
import { CreateTaskStatusDto } from './dto/task-status/create-task-status.dto';
import { CreateTaskStatusCommand } from '../application/task-status/commands/create-task-status/create-task-status.command';
import { FindTaskStatusesQuery } from '../application/task-status/queries/find-task-statuses/find-task-statuses.query';

@Controller()
@ApiTags('Tasks')
@ApiBearerAuth('JWT')
@UseFilters(new BaseExceptionsFilter())
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('employees/:id/tasks')
  @ApiOperation({ summary: 'Create task for employee' })
  async createTask(@Param('id') id: string, @Body() dto: CreateTaskDto) {
    const { startTime, endTime, statusId } = dto;

    const taskId = await this.commandBus.execute<CreateTaskCommand, string>(
      new CreateTaskCommand(
        id,
        new Date(startTime),
        new Date(endTime),
        statusId,
      ),
    );

    return { id: taskId };
  }

  @Get('employees/:id/tasks')
  @ApiOperation({ summary: 'Find tasks by employee' })
  async findTasks(@Param('id') id: string) {
    return this.queryBus.execute<
      FindTasksByEmployeeQuery,
      import('../application/task/queries/task.read-model').TaskReadModel[]
    >(new FindTasksByEmployeeQuery(id));
  }

  @Get('task-statuses')
  @ApiOperation({ summary: 'Find task statuses' })
  async findTaskStatuses() {
    return this.queryBus.execute<
      FindTaskStatusesQuery,
      { id: string; name: string }[]
    >(new FindTaskStatusesQuery());
  }

  @Post('task-statuses')
  @ApiOperation({ summary: 'Create task status' })
  async createTaskStatus(@Body() dto: CreateTaskStatusDto) {
    const id = await this.commandBus.execute<CreateTaskStatusCommand, string>(
      new CreateTaskStatusCommand(dto.name),
    );

    return { id };
  }
}
