import { UserEmail } from '../value-objects/user-email.vo';
import { UserRole } from '../value-objects/user-role.vo';

export interface UserProps {
  email: UserEmail;
  password: string;
  role: UserRole;
}

export interface CreateUserProps {
  id: string;
  email: string;
  password: string;
  role?: string;
}

export enum UserRoles {
  admin = 'ADMIN',
  user = 'USER',
}
