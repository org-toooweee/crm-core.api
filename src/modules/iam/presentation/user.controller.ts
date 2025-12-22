import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../application/user/commands/create-user.command';
import { FindUsersQuery } from '../application/user/queries/find-users.query';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UserReadModel } from '../application/user/queries/user.read-model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseExceptionsFilter } from '@infra/exception-filters/base-exceptions.filter';

@Controller('users')
@ApiTags('Users')
@UseFilters(new BaseExceptionsFilter())
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  async create(@Body() createUserDto: CreateUserDto) {
    const { email, password, role } = createUserDto;
    const id = await this.commandBus.execute<CreateUserCommand, string>(
      new CreateUserCommand(email, password, role),
    );
    return {
      id,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Find users' })
  async findAll() {
    return this.queryBus.execute<FindUsersQuery, UserReadModel[]>(
      new FindUsersQuery(),
    );
  }
}
