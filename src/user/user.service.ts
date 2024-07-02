import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(dto: AuthDto) {
        const user = {
            email: dto.email,
            // name: '',
            password: await hash(dto.password),
        };

        return this.prisma.user.create({
            data: user,
        });
    }

    getById(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    getByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
}
