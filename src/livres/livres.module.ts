import { Module } from '@nestjs/common';
import { LivresService } from './livres.service';
import { LivresController } from './livres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivreEntity } from './entities/livre.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      LivreEntity
    ])
  ],
  controllers: [LivresController],
  providers: [LivresService],
})
export class LivresModule {}
