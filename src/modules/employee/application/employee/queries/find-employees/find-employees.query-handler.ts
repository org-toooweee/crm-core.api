import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FindEmployeesQuery } from './find-employees.query';
import { PrismaService } from '@infra/prisma/prisma.service';
import { EmployeeReadModel } from '../employee.read-model';
import { EmployeePersistenceMapper } from '../../../../infra/mappers/employee.persistence.mapper';

@QueryHandler(FindEmployeesQuery)
export class FindEmployeesQueryHandler implements IQueryHandler<
  FindEmployeesQuery,
  EmployeeReadModel[]
> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapper: EmployeePersistenceMapper,
  ) {}

  async execute() {
    const employees = await this.prismaService.employee.findMany();

    return employees.map((record) => {
      const domain = this.mapper.toDomain(record);
      const p = domain.getProps();

      return {
        id: domain.id,
        firstname: p.firstname,
        lastname: p.lastname,
        patronymic: p.patronymic,
        employmentDate: p.employmentDate,
        birthdayDate: p.birthdayDate,
        isFired: p.isFired,
        userId: p.userId,
        createdAt: domain.createdAt,
        updatedAt: domain.updatedAt,
      } as EmployeeReadModel;
    });
  }
}
