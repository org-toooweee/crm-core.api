import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../../di-tokens/user.di-tokens';
import { UserRepositoryPort } from '../../../../database/user/user.repository.port';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(command: RegisterCommand) {}
}
