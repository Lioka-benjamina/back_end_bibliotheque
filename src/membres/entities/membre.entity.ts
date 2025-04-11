import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('membres')
export class MembreEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    nom : string

    @Column()
    prenom : string

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
