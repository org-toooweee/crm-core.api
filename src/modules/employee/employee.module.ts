import { Module } from '@nestjs/common';
import { EmployeeController } from './presentation/employee.controller';

@Module({
  controllers: [EmployeeController],
})
export class EmployeeModule {}
