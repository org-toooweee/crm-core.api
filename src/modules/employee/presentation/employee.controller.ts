import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  Param,
  Patch,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { EmployeeReadModel } from '../application/employee/queries/employee.read-model';
import { FindEmployeeByIdQuery } from '../application/employee/queries/find-employee-by-id/find-employee-by-id.query';
import { UpdateEmployeeCommand } from '../application/employee/commands/update-employee/update-employee.command';
import { CreateEmployeeCommand } from '../application/employee/commands/create-employee/create-employee.command';
import { FindEmployeesQuery } from '../application/employee/queries/find-employees/find-employees.query';
import { CreateEmployeeDto } from './dto/employee/create-employee.dto';
import { UpdateEmployeeDto } from './dto/employee/update-employee.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BaseExceptionsFilter } from '@infra/exception-filters/base-exceptions.filter';

@Controller('employees')
@ApiTags('Employees')
@ApiBearerAuth('accessToken')
@UseFilters(new BaseExceptionsFilter())
export class EmployeeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create an employee' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const {
      firstname,
      lastname,
      patronymic,
      employmentDate,
      birthdayDate,
      userId,
    } = createEmployeeDto;

    const id = await this.commandBus.execute<CreateEmployeeCommand, string>(
      new CreateEmployeeCommand(
        firstname,
        lastname,
        patronymic,
        new Date(employmentDate),
        new Date(birthdayDate),
        userId,
      ),
    );

    return { id };
  }

  @Get()
  @ApiOperation({ summary: 'Find employees' })
  async findAll() {
    return this.queryBus.execute<FindEmployeesQuery, EmployeeReadModel[]>(
      new FindEmployeesQuery(),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find employee by id' })
  async findById(@Param('id') id: string) {
    return this.queryBus.execute<
      FindEmployeeByIdQuery,
      EmployeeReadModel | null
    >(new FindEmployeeByIdQuery(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update employee' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateEmployeeDto) {
    const {
      firstname,
      lastname,
      patronymic,
      employmentDate,
      birthdayDate,
      isFired,
    } = updateDto;

    await this.commandBus.execute<UpdateEmployeeCommand, void>(
      new UpdateEmployeeCommand(
        id,
        firstname,
        lastname,
        patronymic,
        employmentDate ? new Date(employmentDate) : undefined,
        birthdayDate ? new Date(birthdayDate) : undefined,
        isFired,
      ),
    );

    return { id };
  }
}
