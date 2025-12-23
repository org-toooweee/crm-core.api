import { AggregateId, AggregateRoot } from '@libs/ddd';
import {
  CreateRefreshTokenProps,
  RefreshTokenProps,
} from '../types/token.types';

export class RefreshTokenEntity extends AggregateRoot<RefreshTokenProps> {
  protected _id: AggregateId;

  private constructor(id: AggregateId, props: RefreshTokenProps) {
    super({ id, props });
  }

  static create(props: CreateRefreshTokenProps): RefreshTokenEntity {
    const { id, ...tokenProps } = props;

    return new RefreshTokenEntity(id, tokenProps);
  }

  validate() {}
}
