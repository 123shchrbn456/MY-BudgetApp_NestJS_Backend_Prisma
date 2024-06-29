import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService) {}

    create(dto: Prisma.TransactionCreateInput) {
        return this.prisma.transaction.create({
            data: { ...dto, user: { connect: { id: +dto.user } }, category: { connect: { id: +dto.category } } },
        });
    }

    findAll() {
        return this.prisma.transaction.findMany({
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
