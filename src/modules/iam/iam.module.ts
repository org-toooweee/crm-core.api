import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './di-tokens/user.di-tokens';
import { UserRepository } from './database/user/user.repository';
import { UserController } from './presentation/user.controller';
import { CreateUserCommandHandler } from './application/user/commands/create-user.command-handler';
import { FindUsersQueryHandler } from './application/user/queries/find-users.query-handler';
import { UserMapper } from './mappers/user.mapper';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    CreateUserCommandHandler,
    FindUsersQueryHandler,
    UserMapper,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
})
export class IamModule {}
