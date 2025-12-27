import { PersistenceMapper } from '@libs/ddd';
import { Prisma } from '@prisma-client/client';
import { EmployeeEntity } from '../../domain/employee/entities/employee.entity';
import { CreateEmployeeProps } from '../../domain/employee/types/employee.types';

type EmployeeDBRecord = Prisma.EmployeeGetPayload<object>;

export class EmployeePersistenceMapper implements PersistenceMapper<
  EmployeeEntity,
  EmployeeDBRecord
> {
  toPersistence(entity: EmployeeEntity): EmployeeDBRecord {
    const props = entity.getProps();

    return {
      id: entity.id,
      firstname: props.firstname,
      lastname: props.lastname,
      patronymic: props.patronymic,
      employmentDate: props.employmentDate,
      birthdate: props.birthdayDate,
      isFired: props.isFired,
      userId: props.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as EmployeeDBRecord;
  }

  toDomain(record: EmployeeDBRecord): EmployeeEntity {
    return EmployeeEntity.create({
      id: record.id,
      firstname: record.firstname,
      lastname: record.lastname,
      patronymic: record.patronymic,
      employmentDate: record.employmentDate,
      birthdayDate: record.birthdate,
      isFired: record.isFired,
      userId: record.userId,
    } as CreateEmployeeProps);
  }
}
