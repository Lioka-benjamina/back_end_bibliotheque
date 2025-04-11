import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LivreEntity } from './entities/livre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LivresService {

  constructor(
    @InjectRepository(LivreEntity)
    private livreRepo: Repository<LivreEntity>
  ){}

  async create(LivreDto: CreateLivreDto) {
    const {titre,auteur}  = LivreDto
    const getLivre = await this.livreRepo.findOneBy({titre : titre , auteur : auteur})
    if(getLivre) throw new BadRequestException("c'est déjà fait")
    
    const saveLivre = await this.livreRepo.save(LivreDto)
    return saveLivre
  }

  async findAll() {
    try {
      const allLivre = await this.livreRepo.find()
      return allLivre
    } catch (error) {
      throw new NotFoundException("aucun livre")
    }
  }

  async findOne(id: number) {
    try {
      const oneLivre = await this.livreRepo.findOne({
        where : {id}
      })
      return oneLivre
    } catch (error) {
      throw new NotFoundException("id non identifier")
    }
  }

  async update(id: number, updateLivreDto: UpdateLivreDto) {
    await this.livreRepo.update(id , updateLivreDto)
    const getLivre = await this.findOne(id)
    return getLivre
  }

  async remove(id: number) {
    await this.livreRepo.delete(id)
    return "livre supprimé"
  }
}
