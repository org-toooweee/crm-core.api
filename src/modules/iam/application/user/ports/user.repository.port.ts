import { RepositoryPort } from '@libs/ddd';
import { UserEntity } from '../../domain/user/entities/user.entity';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
}
