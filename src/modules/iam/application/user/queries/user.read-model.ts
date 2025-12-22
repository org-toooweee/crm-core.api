import { BaseReadModel } from '@libs/ddd';

export type UserReadModel = BaseReadModel & {
  email: string;
  role: string;
};
