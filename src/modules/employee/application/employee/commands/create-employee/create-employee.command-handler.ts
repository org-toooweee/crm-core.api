import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEmployeeCommand } from './create-employee.command';

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeCommandHandler implements ICommandHandler<CreateEmployeeCommand> {
  async execute() {}
}
