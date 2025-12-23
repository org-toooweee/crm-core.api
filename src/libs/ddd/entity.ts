export type AggregateId = string;

export interface BaseEntityProps {
  id: AggregateId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T> {
  id: AggregateId;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Entity<EntityProps> {
  protected _id: AggregateId;
  protected readonly props: EntityProps;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor({
    id,
    createdAt,
    updatedAt,
    props,
  }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this.props = props;
    this.validate();
  }

  get id() {
    return this._id;
  }

  private setId(id: AggregateId) {
    this._id = id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  equals(object?: Entity<EntityProps>) {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return object.id === this.id;
  }

  getProps(): EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this.id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };

    return Object.freeze(propsCopy);
  }

  abstract validate(): void;
}
