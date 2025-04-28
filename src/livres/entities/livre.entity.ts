import { EmpruntEntity } from "src/emprunt/entities/emprunt.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("livre")
export class LivreEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    titre : string

    @Column()
    auteur : string

    @Column()
    categorie : string

    @OneToMany(()=>EmpruntEntity , emprunt => emprunt.livre , {
        cascade : true,
        orphanedRowAction : "delete"
    })
    emprunts : EmpruntEntity[]

    @Column()
    editeur : string

    @Column({default : "disponible"})
    disponibilite : string
}
