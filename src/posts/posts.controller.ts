import { Controller, Post, Body, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Prisma } from '@prisma/client';
import { Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // Create a new post
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() postData: Prisma.PostCreateInput) {
    return this.postsService.create(
      {
        title: postData.title,
        content: postData.content,
      },
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne({ id });
  }
}
