export abstract class ValueObject<T> {
  protected readonly value: T;

  protected constructor(value: T) {
    this.value = value;
  }

  equals(vo: ValueObject<T>): boolean {
    return vo.value === this.value;
  }

  getValue(): T {
    return this.value;
  }
}
