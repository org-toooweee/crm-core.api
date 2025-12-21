import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler<RegisterCommand> {
  async execute(command: RegisterCommand) {}
}
