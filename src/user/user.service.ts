import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    create(dto: Prisma.UserCreateInput) {
        return this.prisma.user.create({
            data: dto,
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }
}
