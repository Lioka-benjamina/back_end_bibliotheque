import { EmpruntEntity } from "src/emprunt/entities/emprunt.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('membres')
export class MembreEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    nom : string

    @Column()
    prenom : string

    @OneToMany(()=>EmpruntEntity , emprunt => emprunt.membre , {
        cascade : true,
        orphanedRowAction : "delete"
    })
    emprunts : EmpruntEntity[]

    @Column()
    numero_mobile : number

    @Column()
    email : string

    @Column()
    genre : string

    @Column({default : null})
    image : string

    @CreateDateColumn()
    date_adhesion : Date
}
