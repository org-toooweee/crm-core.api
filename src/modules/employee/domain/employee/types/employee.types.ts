export interface EmployeeProps {}

export interface CreateEmployeeProps {
  firstname: string;
  lastname: string;
  patronymic: string;
  employmentDate: Date;
  birthdayDate: Date;
  isFired: boolean;
  userId: string;
}
