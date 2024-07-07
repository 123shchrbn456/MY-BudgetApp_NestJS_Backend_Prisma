import { Injectable } from '@nestjs/common';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService) {}

    create(dto: Prisma.TransactionCreateInput, userId: string) {
        return this.prisma.transaction.create({
            data: { ...dto, user: { connect: { id: +userId } }, category: { connect: { id: +dto.category } } },
        });
    }

    findAll(userId: string) {
        return this.prisma.transaction.findMany({
            where: {
                user_id: +userId,
            },
            include: {
                user: true,
                category: true,
            },
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} transaction`;
    }

    update(id: number, updateTransactionDto: UpdateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }

    remove(id: number) {
        return `This action removes a #${id} transaction`;
    }
}
