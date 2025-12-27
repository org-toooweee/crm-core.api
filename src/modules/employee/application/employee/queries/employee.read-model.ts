import { BaseReadModel } from '@libs/ddd';

export type EmployeeReadModel = BaseReadModel & {
  firstname: string;
  lastname: string;
  patronymic?: string;
  employmentDate: Date;
  birthdayDate: Date;
  isFired: boolean;
  userId: string;
};
