import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ConfigModule.forRoot(), TransactionModule, UserModule, CategoryModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
