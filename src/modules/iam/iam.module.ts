import { Module } from '@nestjs/common';
import {
  JWT_TOKEN_SERVICE,
  PASSWORD_SERVICE,
  TOKEN_REPOSITORY,
  USER_REPOSITORY,
} from './di-tokens/di-tokens';
import { UserController } from './presentation/user.controller';
import { CreateUserCommandHandler } from './application/user/commands/create-user.command-handler';
import { FindUsersQueryHandler } from './application/user/queries/find-users.query-handler';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from '@infra/env/env.module';
import { EnvService } from '@infra/env/env.service';
import { AuthController } from './presentation/auth.controller';
import { RegisterCommandHandler } from './application/auth/commands/register/register.command-handler';
import { UserRepository } from './infra/repositories';
import { RefreshTokenRepository } from './infra/repositories';
import { ArgonPasswordService } from './infra/services';
import { JwtTokenService } from './infra/services';
import { UserPersistenceMapper } from './infra/mappers/user.persistence.mapper';
import { UserResponseMapper } from './presentation/mappers/user.response.mapper';
import { AuthService } from './application/auth/auth.service';

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
  controllers: [UserController, AuthController],
  providers: [
    CreateUserCommandHandler,
    FindUsersQueryHandler,
    RegisterCommandHandler,
    UserPersistenceMapper,
    UserResponseMapper,
    AuthService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: TOKEN_REPOSITORY,
      useClass: RefreshTokenRepository,
    },
    {
      provide: PASSWORD_SERVICE,
      useClass: ArgonPasswordService,
    },
    {
      provide: JWT_TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
  ],
})
export class IamModule {}
