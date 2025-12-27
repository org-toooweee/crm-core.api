import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateEmployeeCommand } from './update-employee.command';
import { Inject } from '@nestjs/common';
import { EMPLOYEE_REPOSITORY } from '../../../../di-tokens/di-tokens';
import { EmployeeRepositoryPort } from '../../employee.repository.port';
import { EmployeeEntity } from '../../../../domain/employee/entities/employee.entity';

@CommandHandler(UpdateEmployeeCommand)
export class UpdateEmployeeCommandHandler implements ICommandHandler<
  UpdateEmployeeCommand,
  void
> {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: EmployeeRepositoryPort,
  ) {}

  async execute(command: UpdateEmployeeCommand) {
    const existing = await this.employeeRepository.findById(command.id);
    if (!existing) {
      throw new Error('Employee not found');
    }

    const props = existing.getProps();

    const updated = {
      id: existing.id,
      firstname: command.firstname ?? props.firstname,
      lastname: command.lastname ?? props.lastname,
      patronymic: command.patronymic ?? props.patronymic,
      employmentDate: command.employmentDate ?? props.employmentDate,
      birthdayDate: command.birthdayDate ?? props.birthdayDate,
      isFired:
        typeof command.isFired === 'boolean' ? command.isFired : props.isFired,
      userId: props.userId,
    };

    const employee = EmployeeEntity.create(updated);

    await this.employeeRepository.update(employee);
  }
}
