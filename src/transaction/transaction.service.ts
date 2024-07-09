import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findOne(id: number) {
        const transaction = await this.prisma.transaction.findUnique({
            where: {
                id: +id,
            },
        });

        if (!transaction) throw new NotFoundException('Transaction is not found!');

        return transaction;
    }

    async update(id: string, updateDto: Prisma.TransactionUpdateInput) {
        const transaction = await this.findOne(+id);

        if (!transaction) throw new NotFoundException('Transaction not found');

        return this.prisma.transaction.update({
            where: { id: transaction.id },
            data: updateDto,
        });
    }

    async remove(id: string) {
        const transaction = await this.findOne(+id);

        if (!transaction) throw new NotFoundException('Transaction not found');

        return this.prisma.transaction.delete({
            where: {
                id: +id,
            },
        });
    }

    async findAllWithPagination() {}

    async findAllByType() {}
}
