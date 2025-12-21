import { BaseResponse } from '@libs/api';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto extends BaseResponse {
  @ApiProperty({
    example: 'user@gmail.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    example: 'USER',
    description: "User's role",
  })
  role: string;
}
