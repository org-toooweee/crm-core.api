import { Module } from '@nestjs/common';
import { IamModule } from './modules/iam/iam.module';
import { PrismaModule } from '@infra/prisma/prisma.module';
import { EnvModule } from '@infra/env/env.module';
import { ProviderModule } from '@infra/providers/provider.module';

@Module({
  imports: [IamModule, PrismaModule, EnvModule, ProviderModule],
})
export class AppModule {}
