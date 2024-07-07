import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, HttpCode } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Prisma } from '@prisma/client';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { Auth } from '../auth/decorator/auth.decorator';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    @Auth()
    create(@Body() dto: Prisma.CategoryCreateInput, @CurrentUser('id') userId: string) {
        return this.categoryService.create(dto, userId);
    }

    @Get()
    @Auth()
    findAll(@CurrentUser('id') userId: string) {
        return this.categoryService.findAll(userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: Prisma.CategoryUpdateInput) {
        return this.categoryService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoryService.remove(id);
    }
}
