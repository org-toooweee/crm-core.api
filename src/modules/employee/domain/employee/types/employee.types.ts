import { AggregateId } from '@libs/ddd';

export interface EmployeeProps {
  firstname: string;
  lastname: string;
  patronymic: string;
  employmentDate: Date;
  birthdayDate: Date;
  isFired: boolean;
  userId: AggregateId;
}

export interface CreateEmployeeProps {
  id: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  employmentDate: Date;
  birthdayDate: Date;
  isFired: boolean;
  userId: string;
}
