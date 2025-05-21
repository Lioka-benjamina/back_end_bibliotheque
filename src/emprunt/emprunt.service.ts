import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpruntDto } from './dto/create-emprunt.dto';
import { UpdateEmpruntDto } from './dto/update-emprunt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpruntEntity } from './entities/emprunt.entity';
import { Repository } from 'typeorm';
import { MembreEntity } from 'src/membres/entities/membre.entity';
import { LivreEntity } from 'src/livres/entities/livre.entity';

@Injectable()
export class EmpruntService {

  constructor(
    @InjectRepository(EmpruntEntity)
    private empruntRepo : Repository<EmpruntEntity>,

    @InjectRepository(MembreEntity)
    private membreRepo : Repository<MembreEntity>,

    @InjectRepository(LivreEntity)
    private livreRepo : Repository<LivreEntity>
  ){}

  async create(EmpruntDto: CreateEmpruntDto) {
    const {membre,livre,date_emprunt,date_retour} = EmpruntDto

    const membreExist = await this.membreRepo.findOne({where : {id : membre}})
    const livreExist = await this.livreRepo.findOne({where : {id : livre}})
    const empruntActif = await this.empruntRepo.findOne({
      where : {
        livre : {id : livre},
        date_retour : null
      }
    })

    if(!membreExist){
      throw new NotFoundException("l'id de membre n'existe pas"); 
    }

    if(!livreExist){
      throw new NotFoundException("ce livre n'existe pas"); 
    }

    if(empruntActif){
      throw new BadRequestException("livre déjà emprunté")
    }

    const emprunt = this.empruntRepo.create({
      membre : membreExist,
      livre : livreExist,
      date_emprunt,
      date_retour
    })

    return await this.empruntRepo.save(emprunt);
  }

  async findAll() {
    try {
      const allEmprunt = await this.empruntRepo.find({
        relations: ['membre', 'livre'], // ← c'est ici la magie
      })
      return allEmprunt
    } catch (error) {
      throw new NotFoundException("liste d'emprunt not found")
    }
  }

  async findOne(id: number) {
    try {
      const oneEmprunt = await this.empruntRepo.findOne({
        where : {id},
        relations : ["membre" , "livre"]
      })
      return oneEmprunt
    } catch (error) {
      throw new NotFoundException("id not found")
    }
  }

  async update(id: number, updateEmpruntDto: UpdateEmpruntDto) {
    const {membre , livre , date_emprunt , ...restData} = updateEmpruntDto

    await this.empruntRepo.update(id , restData)
    const getEmprunt = this.findOne(id)
    return getEmprunt
  }

  async remove(id: number) {
    await this.empruntRepo.delete(id)
    return "emprun supprimé"
  }

  async retournerLivre(id: number) {
    const emprunt = await this.findOne(id);
    
    if (!emprunt) {
      throw new NotFoundException(`Emprunt avec l'ID ${id} non trouvé`);
    }
    
    // Supprimer l'enregistrement au lieu de mettre à jour la date de retour
    await this.empruntRepo.delete(id);
    
    return {
      message: "Livre retourné avec succès",
      id: id // Retourner l'ID pour confirmation
    };
  }

  // Nouvelle méthode pour prolonger un emprunt
  async prolongerEmprunt(id: number) {
    const emprunt = await this.findOne(id);
    
    if (!emprunt) {
      throw new NotFoundException(`Emprunt avec l'ID ${id} non trouvé`);
    }
    
    // Vérifier si l'emprunt est déjà terminé
    if (emprunt.date_retour_effectif) {
      throw new BadRequestException(`Cet emprunt est déjà terminé`);
    }
    
    // Calculer la nouvelle date de retour (ajouter 14 jours à la date actuelle)
    const nouvelleDate = new Date(emprunt.date_retour);
    nouvelleDate.setDate(nouvelleDate.getDate() + 14);
    
    // Mettre à jour la date de retour
    await this.empruntRepo.update(id, {
      date_retour: nouvelleDate
    });
    
    // Récupérer l'emprunt mis à jour
    const empruntMisAJour = await this.findOne(id);
    
    return {
      message: "Emprunt prolongé avec succès",
      emprunt: empruntMisAJour
    };
  }
}
