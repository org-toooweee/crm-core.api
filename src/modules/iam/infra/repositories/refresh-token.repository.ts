import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Token } from '@prisma-client/client';
import { RefreshTokenRepositoryPort } from '../../application/auth/ports/refresh-token.repository.port';
import { RefreshTokenEntity } from '../../domain/auth/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository implements RefreshTokenRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async upsert(token: RefreshTokenEntity) {
    const props = token.getProps();

    const newToken = await this.prismaService.token.upsert({
      where: {
        userId_userAgent: {
          userId: props.userId,
          userAgent: props.userAgent,
        },
      },
      create: {
        ...props,
      },
      update: {
        token: props.token,
        expiresAt: props.expiresAt,
      },
    });

    return this.toDomain(newToken);
  }

  async findByToken(token: string) {
    const tokenFromDb = await this.prismaService.token.findUnique({
      where: {
        token,
      },
    });

    if (!tokenFromDb) {
      return null;
    }

    return this.toDomain(tokenFromDb);
  }

  async delete(token: string) {
    const tokenFromDb = await this.prismaService.token.delete({
      where: {
        token,
      },
    });

    if (!tokenFromDb) {
      return null;
    }

    return {
      id: tokenFromDb.id,
    };
  }

  private toDomain(token: Token) {
    return RefreshTokenEntity.create({
      id: token.id,
      token: token.token,
      userId: token.userId,
      expiresAt: token.expiresAt,
      userAgent: token.userAgent ?? null,
    });
  }
}
