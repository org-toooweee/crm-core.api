import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEmployeeCommand } from './create-employee.command';
import { EmployeeEntity } from '../../../../domain/employee/entities/employee.entity';
import { randomUUID } from 'crypto';
import { Inject } from '@nestjs/common';
import { EMPLOYEE_REPOSITORY } from '../../../../di-tokens/di-tokens';
import { EmployeeRepositoryPort } from '../../employee.repository.port';

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeCommandHandler implements ICommandHandler<
  CreateEmployeeCommand,
  string
> {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: EmployeeRepositoryPort,
  ) {}

  async execute(command: CreateEmployeeCommand) {
    const {
      firstname,
      lastname,
      patronymic,
      employmentDate,
      birthdayDate,
      userId,
    } = command;

    const id = randomUUID();

    const employee = EmployeeEntity.create({
      id,
      firstname,
      lastname,
      patronymic,
      employmentDate,
      birthdayDate,
      isFired: false,
      userId,
    });

    await this.employeeRepository.insert(employee);

    return id;
  }
}
