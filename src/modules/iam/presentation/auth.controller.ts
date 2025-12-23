import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthDto } from '../dtos/auth/auth.dto';
import { RegisterCommand } from '../application/auth/commands/register/register.command';
import { BaseExceptionsFilter } from '@infra/exception-filters/base-exceptions.filter';

@Controller('auth')
@UseFilters(new BaseExceptionsFilter())
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register')
  async register(@Body() registerDto: AuthDto) {
    return this.commandBus.execute(
      new RegisterCommand(registerDto.email, registerDto.password),
    );
  }

  @Post('login')
  async login(@Body() loginDto: AuthDto) {}
}
