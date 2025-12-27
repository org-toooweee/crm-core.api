import { Module } from '@nestjs/common';
import { EmployeeController } from './presentation/employee.controller';
import { TaskController } from './presentation/task.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateEmployeeCommandHandler } from './application/employee/commands/create-employee/create-employee.command-handler';
import { FindEmployeesQueryHandler } from './application/employee/queries/find-employees/find-employees.query-handler';
import { FindEmployeeByIdQueryHandler } from './application/employee/queries/find-employee-by-id/find-employee-by-id.query-handler';
import { UpdateEmployeeCommandHandler } from './application/employee/commands/update-employee/update-employee.command-handler';
import { CreateTaskCommandHandler } from './application/task/commands/create-task/create-task.command-handler';
import { FindTasksByEmployeeQueryHandler } from './application/task/queries/find-tasks-by-employee/find-tasks-by-employee.query-handler';
import { CreateTaskStatusCommandHandler } from './application/task-status/commands/create-task-status/create-task-status.command-handler';
import { FindTaskStatusesQueryHandler } from './application/task-status/queries/find-task-statuses/find-task-statuses.query-handler';
import {
  EMPLOYEE_REPOSITORY,
  TASK_REPOSITORY,
  TASK_STATUS_REPOSITORY,
} from './di-tokens/di-tokens';
import { TaskPersistenceMapper } from './infra/mappers/task.persistence.mapper';
import { TaskStatusPersistenceMapper } from './infra/mappers/task-status.persistence.mapper';
import { EmployeeRepository } from './infra/repositories/employee/employee.repository';
import { TaskRepository } from './infra/repositories/task/task.repository';
import { TaskStatusRepository } from './infra/repositories/task-status/task-status.repository';
import { EmployeePersistenceMapper } from './infra/mappers/employee.persistence.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [EmployeeController, TaskController],
  providers: [
    CreateEmployeeCommandHandler,
    FindEmployeesQueryHandler,
    FindEmployeeByIdQueryHandler,
    UpdateEmployeeCommandHandler,
    CreateTaskCommandHandler,
    FindTasksByEmployeeQueryHandler,
    CreateTaskStatusCommandHandler,
    FindTaskStatusesQueryHandler,
    EmployeePersistenceMapper,
    // mappers
    TaskPersistenceMapper,
    TaskStatusPersistenceMapper,
    {
      provide: EMPLOYEE_REPOSITORY,
      useClass: EmployeeRepository,
    },
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepository,
    },
    {
      provide: TASK_STATUS_REPOSITORY,
      useClass: TaskStatusRepository,
    },
  ],
})
export class EmployeeModule {}
