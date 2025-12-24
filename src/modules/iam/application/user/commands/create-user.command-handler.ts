import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { type UserRepositoryPort } from '../../../infra/user/user.repositories.port';
import { UserEntity } from '../../../domain/user/entities/user.entity';
import { randomUUID } from 'crypto';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../di-tokens/di-tokens';
import { UserAlreadyExistsException } from '../../../domain/user/exceptions/user.exceptions';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<
  CreateUserCommand,
  string
> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(command: CreateUserCommand) {
    const { email, password, role } = command;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    const id = randomUUID();

    const user = UserEntity.create({
      id,
      email,
      password,
      role,
    });

    await this.userRepository.insert(user);

    return id;
  }
}
