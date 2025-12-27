import { Module } from '@nestjs/common';
import { IamModule } from './modules/iam/iam.module';
import { PrismaModule } from '@infra/prisma/prisma.module';
import { EnvModule } from '@infra/env/env.module';
import { NotificationModule } from './modules/notification/notification.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [
    IamModule,
    PrismaModule,
    EnvModule,
    NotificationModule,
    EmployeeModule,
  ],
})
export class AppModule {}
