import { AggregateId, AggregateRoot } from '@libs/ddd';
import { CreateTokenProps, TokenProps } from '../types/token.types';

export class RefreshTokenEntity extends AggregateRoot<TokenProps> {
  protected _id: AggregateId;

  private constructor(id: AggregateId, props: TokenProps) {
    super({ id, props });
  }

  static create(props: CreateTokenProps) {
    const { id, ...tokenProps } = props;

    return new RefreshTokenEntity(id, tokenProps);
  }

  validate() {}
}
