import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule, CompanyModule, TaxModule } from '@modules';
import { TaxController } from './infrastructure/api/tax/tax.controller';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from 'infrastructure/common/filters';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'market',
      //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TaxModule,
    CompanyModule,
    CategoryModule,
  ],
  controllers: [TaxController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
