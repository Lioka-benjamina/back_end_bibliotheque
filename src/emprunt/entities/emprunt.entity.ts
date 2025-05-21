import { LivreEntity } from "src/livres/entities/livre.entity"
import { MembreEntity } from "src/membres/entities/membre.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("emprunt")
export class EmpruntEntity {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(()=>MembreEntity , membre => membre.emprunts , {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })
    @JoinColumn({name : "membreId"}) //na tsy asiana name aza de omeny otrzao par defaut foana
    membre : MembreEntity

    @ManyToOne(()=>LivreEntity , livre => livre.emprunts , {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })
    @JoinColumn({
      name: "livreId"
    })
    livre : LivreEntity
    
    @Column()
    date_emprunt : Date

    @Column()
    date_retour : Date

    // Nouvelle colonne pour enregistrer la date réelle du retour
    @Column({ type: 'date', nullable: true })
    date_retour_effectif: Date;
}
