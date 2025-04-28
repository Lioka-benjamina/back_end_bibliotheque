import { Module } from '@nestjs/common';
import { EmpruntService } from './emprunt.service';
import { EmpruntController } from './emprunt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpruntEntity } from './entities/emprunt.entity';
import { LivreEntity } from 'src/livres/entities/livre.entity';
import { MembreEntity } from 'src/membres/entities/membre.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      EmpruntEntity,
      LivreEntity,
      MembreEntity
    ])
  ],
  controllers: [EmpruntController],
  providers: [EmpruntService],
})
export class EmpruntModule {}
