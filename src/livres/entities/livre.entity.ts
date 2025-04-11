import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    editeur : string

    @Column({default : "disponible"})
    disponibilite : string
}
