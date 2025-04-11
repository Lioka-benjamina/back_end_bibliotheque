import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMembreDto } from './dto/create-membre.dto';
import { UpdateMembreDto } from './dto/update-membre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MembreEntity } from './entities/membre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembresService {
  constructor(
    @InjectRepository(MembreEntity)
    private membreRepo : Repository<MembreEntity>
  ){}
  async create(MembreDto: CreateMembreDto) {
    const {email} = MembreDto
    const getMembre = await this.membreRepo.findOneBy({email : email})
    if(getMembre) throw new BadRequestException("cet homme que vous ajoutez est déjà membre")

    const saveMembre = await this.membreRepo.save(MembreDto)
    return saveMembre
  }

  async findAll() {
    try {
      const AllMembre = await this.membreRepo.find()
      return AllMembre
    } catch (error) {
      throw new NotFoundException("Aucun membre")
    }
  }

  async findOne(id: number) {
    try {
      const oneMembre = await this.membreRepo.findOne({where : {id}})
      return oneMembre
    } catch (error) {
      throw new NotFoundException("Membre not found")
    }
  }

  async update(id: number, updateMembreDto: UpdateMembreDto) {
    await this.membreRepo.update(id , updateMembreDto)
    const getMembre = await this.findOne(id)
    return getMembre
  }

  async remove(id: number) {
    await this.membreRepo.delete(id)
    return "membre supprimé"
  }
}
