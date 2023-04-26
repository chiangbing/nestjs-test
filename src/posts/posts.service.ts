import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findOne(postWhereUniqueInput: Prisma.PostWhereUniqueInput) {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async create(post: CreatePostDto, author: User) {
    return this.prisma.post.create({
      data: {
        ...post,
        author: {
          connect: { id: author.id },
        },
      },
    });
  }
}
