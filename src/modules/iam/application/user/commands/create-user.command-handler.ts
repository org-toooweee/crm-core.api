import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { type UserRepositoryPort } from '../../../database/user/user.repository.port';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(command: CreateUserCommand) {}
}
