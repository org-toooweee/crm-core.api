import { Module } from '@nestjs/common';
import {
  PASSWORD_HASH,
  TOKEN_REPOSITORY,
  USER_REPOSITORY,
} from './di-tokens/user.di-tokens';
import { UserRepository } from './database/user/user.repository';
import { UserController } from './presentation/user.controller';
import { CreateUserCommandHandler } from './application/user/commands/create-user.command-handler';
import { FindUsersQueryHandler } from './application/user/queries/find-users.query-handler';
import { UserMapper } from './mappers/user.mapper';
import { CqrsModule } from '@nestjs/cqrs';
import { RefreshTokenRepository } from './database/refresh-token/refresh-token.repository';
import { PasswordHash } from './infra/password-hash/password-hash';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from '@infra/env/env.module';
import { EnvService } from '@infra/env/env.service';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory: (envService: EnvService): any => ({
        global: true,
        secret: envService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: envService.get('JWT_AT_EXPIRES'),
        },
      }),
      inject: [EnvService],
    }),
  ],
  controllers: [UserController],
  providers: [
    CreateUserCommandHandler,
    FindUsersQueryHandler,
    UserMapper,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: TOKEN_REPOSITORY,
      useClass: RefreshTokenRepository,
    },
    {
      provide: PASSWORD_HASH,
      useClass: PasswordHash,
    },
  ],
})
export class IamModule {}
