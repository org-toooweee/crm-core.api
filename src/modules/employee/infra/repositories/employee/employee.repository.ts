import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { EmployeePersistenceMapper } from '../../mappers/employee.persistence.mapper';
import { EmployeeRepositoryPort } from '../../../application/employee/employee.repository.port';
import { EmployeeEntity } from '../../../domain/employee/entities/employee.entity';

@Injectable()
export class EmployeeRepository implements EmployeeRepositoryPort {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapper: EmployeePersistenceMapper,
  ) {}

  async insert(entity: EmployeeEntity) {
    const data = this.mapper.toPersistence(entity);

    await this.prismaService.employee.create({
      data: {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        patronymic: data.patronymic,
        employmentDate: data.employmentDate,
        birthdate: data.birthdate,
        isFired: data.isFired,
        userId: data.userId,
      },
    });
  }

  async findAll() {
    const employees = await this.prismaService.employee.findMany();

    return employees.map((e) => this.mapper.toDomain(e));
  }

  async findById(id: string) {
    const record = await this.prismaService.employee.findUnique({
      where: { id },
    });

    if (!record) return null;

    return this.mapper.toDomain(record);
  }

  async findByUserId(userId: string) {
    const record = await this.prismaService.employee.findUnique({
      where: { userId },
    });

    if (!record) return null;

    return this.mapper.toDomain(record);
  }

  async update(entity: EmployeeEntity) {
    const data = this.mapper.toPersistence(entity);

    await this.prismaService.employee.update({
      where: { id: data.id },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        patronymic: data.patronymic,
        employmentDate: data.employmentDate,
        birthdate: data.birthdate,
        isFired: data.isFired,
      },
    });
  }
}
