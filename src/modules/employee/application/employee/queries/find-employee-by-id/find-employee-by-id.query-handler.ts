import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FindEmployeeByIdQuery } from './find-employee-by-id.query';
import { PrismaService } from '@infra/prisma/prisma.service';
import { EmployeeReadModel } from '../employee.read-model';
import { EmployeePersistenceMapper } from '../../../../infra/mappers/employee.persistence.mapper';

@QueryHandler(FindEmployeeByIdQuery)
export class FindEmployeeByIdQueryHandler implements IQueryHandler<
  FindEmployeeByIdQuery,
  EmployeeReadModel | null
> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapper: EmployeePersistenceMapper,
  ) {}

  async execute(query: FindEmployeeByIdQuery) {
    const record = await this.prismaService.employee.findUnique({
      where: { id: query.id },
    });

    if (!record) return null;

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
  }
}
