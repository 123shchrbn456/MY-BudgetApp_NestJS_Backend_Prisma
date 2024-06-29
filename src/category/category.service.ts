import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    create(dto: Prisma.CategoryCreateInput) {
        return this.prisma.category.create({ data: { ...dto, user: { connect: { id: +dto.user } } } });
    }

    findAll() {
        return this.prisma.category.findMany({
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

    remove(id: string) {
        return this.prisma.category.delete({
            where: {
                id: +id,
            },
        });
    }
}
