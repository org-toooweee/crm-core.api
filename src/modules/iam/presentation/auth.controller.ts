import { Body, Controller, Post, Req, Res, UseFilters } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BaseExceptionsFilter } from '@infra/exception-filters/base-exceptions.filter';
import { AuthDto } from './dto/auth/auth.dto';
import { LoginCommand } from '../application/auth/commands/login/login.command';
import { TokensPair } from '../application/auth/auth.types';
import { cookieFactory } from '@libs/shared/cookie/cookie-factory';
import { Request, Response } from 'express';
import { Cookies, Public, UserAgent } from '@libs/shared/auth/decorators';
import { RefreshCommand } from '../application/auth/commands/refresh/refresh.command';
import { LogoutCommand } from '../application/auth/commands/logout/logout.command';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@UseFilters(new BaseExceptionsFilter())
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: AuthDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @UserAgent() userAgent: string,
  ) {
    const tokens = await this.commandBus.execute<
      LoginCommand,
      Promise<TokensPair>
    >(new LoginCommand(loginDto.email, loginDto.password, userAgent));

    return this.handleTokens(tokens, req, res);
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Cookies('REFRESH_TOKEN') refreshToken: string,
  ) {
    const tokens = await this.commandBus.execute<
      RefreshCommand,
      Promise<TokensPair>
    >(new RefreshCommand(refreshToken));

    return this.handleTokens(tokens, req, res);
  }

  @Post('logout')
  @ApiBearerAuth('accessToken')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Cookies('REFRESH_TOKEN') refreshToken: string,
  ) {
    const cookies = cookieFactory(req, res);

    const result = await this.commandBus.execute<
      LogoutCommand,
      Promise<{ success: boolean }>
    >(new LogoutCommand(refreshToken));

    cookies.remove('REFRESH_TOKEN');

    return result;
  }

  private handleTokens(tokens: TokensPair, req: Request, res: Response) {
    const cookies = cookieFactory(req, res);

    cookies.set('REFRESH_TOKEN', tokens.refreshToken, 1000 * 60 * 60 * 24 * 30);

    return {
      accessToken: tokens.accessToken,
    };
  }
}
