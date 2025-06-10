import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule, CompanyModule, TaxModule } from '@modules';
import { TaxController } from './infrastructure/api/tax/tax.controller';

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
  providers: [],
})
export class AppModule {}
