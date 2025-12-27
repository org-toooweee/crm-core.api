import { AggregateId, AggregateRoot } from '@libs/ddd';
import { CreateEmployeeProps, EmployeeProps } from '../types/employee.types';

export class EmployeeEntity extends AggregateRoot<EmployeeProps> {
  private constructor(id: AggregateId, props: EmployeeProps) {
    super({ id, props });
  }

  static create(props: CreateEmployeeProps) {
    const { id, ...employeeProps } = props;

    return new EmployeeEntity(id, employeeProps);
  }

  validate() {
    const props = this.getProps();

    if (!props.firstname || !props.lastname) {
      throw new Error('Invalid employee: firstname and lastname are required');
    }

    if (
      !(props.employmentDate instanceof Date) ||
      isNaN(props.employmentDate.getTime())
    ) {
      throw new Error('Invalid employment date');
    }

    if (
      !(props.birthdayDate instanceof Date) ||
      isNaN(props.birthdayDate.getTime())
    ) {
      throw new Error('Invalid birthday date');
    }

    if (!props.userId) {
      throw new Error('Invalid employee: userId is required');
    }
  }
}
