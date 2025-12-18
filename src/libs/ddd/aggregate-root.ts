import { CreateEntityProps, Entity } from '@libs/ddd/entity';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  constructor(props: CreateEntityProps<EntityProps>) {
    super(props);
  }
}
