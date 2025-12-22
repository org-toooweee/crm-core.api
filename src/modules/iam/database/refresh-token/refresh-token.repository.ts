import { Injectable } from '@nestjs/common';
import { RefreshTokenRepositoryPort } from './refresh-token.repository.port';
import { PrismaService } from '@infra/prisma/prisma.service';

@Injectable()
export class RefreshTokenRepository implements RefreshTokenRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async findByToken(token: string) {
    return this.prismaService.token.findUnique({
      where: {
        token,
      },
    });
  }
}
