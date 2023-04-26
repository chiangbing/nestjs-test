import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  providers: [PostsService, PrismaService, JwtStrategy],
  controllers: [PostsController],
})
export class PostsModule {}
