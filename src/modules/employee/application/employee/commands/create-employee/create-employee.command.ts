export class CreateEmployeeCommand {
  constructor(
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly patronymic: string,
    public readonly employmentDate: Date,
    public readonly birthdayDate: Date,
    public readonly userId: string,
  ) {}
}
