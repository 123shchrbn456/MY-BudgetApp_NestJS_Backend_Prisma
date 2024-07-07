import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, HttpCode } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
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

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
        return this.transactionService.update(+id, updateTransactionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.transactionService.remove(+id);
    }
}
