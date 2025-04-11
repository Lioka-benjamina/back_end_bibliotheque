import { Module } from '@nestjs/common';
import { MembresService } from './membres.service';
import { MembresController } from './membres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembreEntity } from './entities/membre.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      MembreEntity
    ]),
    
  ],
  controllers: [MembresController],
  providers: [MembresService],
})
export class MembresModule {}
