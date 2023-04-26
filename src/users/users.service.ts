import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: bcrypt.hashSync(password, 10),
      },
    });
  }

  findOne(findUserDto: FindUserDto) {
    return this.prisma.user.findUnique({ where: findUserDto });
  }

  updateOne(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  removeOne(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
