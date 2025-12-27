import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskStatusDto {
  @ApiProperty({ example: 'Pending' })
  @IsNotEmpty()
  readonly name: string;
}
