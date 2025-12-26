import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BaseExceptionsFilter } from '@infra/exception-filters/base-exceptions.filter';
import { AuthDto } from './dto/auth/auth.dto';
import { LoginCommand } from '../application/auth/commands/login/login.command';
import { TokensPair } from '../application/auth/auth.types';

@Controller('auth')
@UseFilters(new BaseExceptionsFilter())
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  async login(@Body() loginDto: AuthDto) {
    return this.commandBus.execute<LoginCommand, Promise<TokensPair>>(
      new LoginCommand(loginDto.email, loginDto.password),
    );
  }
}
