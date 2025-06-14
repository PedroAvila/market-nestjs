import { CategoryModule, CompanyModule, TaxModule } from '@modules';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalExceptionFilter } from 'infrastructure/common/filters';
import { TaxController } from './infrastructure/api/tax/tax.controller';
import { SubCategoriaModule } from './modules/sub-categoria.module';
import { envs } from 'infrastructure/common/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      username: envs.dbUserName,
      password: envs.dbPassword,
      database: envs.dbName,
      //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TaxModule,
    CompanyModule,
    CategoryModule,
    SubCategoriaModule,
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
