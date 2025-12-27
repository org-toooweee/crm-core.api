import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID, IsBoolean, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly firstname?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly lastname?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly patronymic?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly employmentDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly birthdayDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isFired?: boolean;
}
