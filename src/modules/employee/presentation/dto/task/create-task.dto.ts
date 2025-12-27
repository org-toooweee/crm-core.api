import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: '2025-12-01T09:00:00Z' })
  @IsDateString()
  readonly startTime: string;

  @ApiProperty({ example: '2025-12-01T17:00:00Z' })
  @IsDateString()
  readonly endTime: string;

  @ApiProperty({ description: 'Task status id' })
  @IsUUID()
  readonly statusId: string;
}
