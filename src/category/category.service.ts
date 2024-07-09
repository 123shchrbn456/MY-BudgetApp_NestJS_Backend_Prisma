import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    create(dto: Prisma.CategoryCreateInput, userId: string) {
        return this.prisma.category.create({ data: { ...dto, user: { connect: { id: +userId } } } });
    }

    findAll(userId: string) {
        return this.prisma.category.findMany({
            where: {
                user_id: +userId,
            },
            include: {
                user: true,
            },
        });
    }

    async findOne(id: number) {
        const category = await this.prisma.category.findUnique({
            where: {
                id: +id,
            },
            include: {
                user: true,
            },
        });

        if (!category) throw new NotFoundException('Category is not found!');

        return category;
    }

    async update(id: string, updateDto: Prisma.CategoryUpdateInput) {
        const category = await this.findOne(+id);

        return this.prisma.category.update({
            where: { id: category.id },
            data: updateDto,
        });
    }

    async remove(id: string) {
        const category = await this.findOne(+id);

        return this.prisma.category.delete({
            where: {
                id: +id,
            },
        });
    }
}
