import { SubCategoryEntity } from '@infrastructure/persistence';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class SubCategoriaModule {}
