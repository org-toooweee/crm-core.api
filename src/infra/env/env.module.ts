import { Global, Module } from '@nestjs/common';
import { EnvService } from '../env/env.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '../env/env';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
