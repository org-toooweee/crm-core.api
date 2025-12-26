import { RepositoryPort } from '@libs/ddd';
import { EmployeeEntity } from '../../domain/employee/entities/employee.entity';

export interface EmployeeRepositoryPort extends RepositoryPort<EmployeeEntity> {
  update(entity: EmployeeEntity): Promise<void>;
}
