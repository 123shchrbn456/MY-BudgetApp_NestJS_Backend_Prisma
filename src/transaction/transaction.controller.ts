import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, HttpCode } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Prisma } from '@prisma/client';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { Auth } from '../auth/decorator/auth.decorator';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    @Auth()
    create(@Body() dto: Prisma.TransactionCreateInput, @CurrentUser('id') userId: string) {
        return this.transactionService.create(dto, userId);
    }

    @Get()
    @Auth()
    findAll(@CurrentUser('id') userId: string) {
        return this.transactionService.findAll(userId);
    }

    @Get(':type/:id')
    @Auth()
    findOne(@Param('id') id: string) {
        return this.transactionService.findOne(+id);
    }

    @Patch(':type/:id')
    @Auth()
    update(@Param('id') id: string, @Body() updateTransactionDto: Prisma.TransactionUpdateInput) {
        return this.transactionService.update(id, updateTransactionDto);
    }

    @Delete(':type/:id')
    @Auth()
    remove(@Param('id') id: string) {
        return this.transactionService.remove(id);
    }
}
