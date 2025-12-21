import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './di-tokens/user.di-tokens';
import { UserRepository } from './database/user/user.repository';
import { UserController } from './presentation/user.controller';
import { CreateUserCommand } from './application/user/commands/create-user.command';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
})
export class IamModule {}
