import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Ivan' })
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ example: 'Petrov' })
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ example: 'Ivanovich' })
  @IsOptional()
  readonly patronymic: string;

  @ApiProperty({ example: '2020-01-01' })
  @IsDateString()
  readonly employmentDate: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString()
  readonly birthdayDate: string;

  @ApiProperty({ example: 'user-uuid' })
  @IsUUID()
  readonly userId: string;
}
