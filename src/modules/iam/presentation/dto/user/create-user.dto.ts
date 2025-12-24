import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRoles } from '../../../domain/user/types/user.types';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'AsdfJkl1!' })
  readonly password: string;

  @ApiProperty({
    example: 'ADMIN',
    enum: UserRoles,
  })
  readonly role?: string;
}
