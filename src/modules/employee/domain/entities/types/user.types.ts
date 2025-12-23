export interface EmployeeProps {}

export interface CreateEmployeeProps {
  firstname: string;
  lastname: string;
  patronymic: string;
  employmentDate: Date;
  birthdayDate: Date;
  department: string;
  isFired: boolean;
  userId: string;
}
