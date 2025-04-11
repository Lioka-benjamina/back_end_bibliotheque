import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    nom : string

    @Column()
    prenom : string

    @Column()
    email : string

    @Column()
    role : string
    
    @Column({default : null})
    image : string

    @Column()
    password : string

    @Column()
    passwordConfirm : string

    @CreateDateColumn()
    createAt : Date
    
    @CreateDateColumn()
    updateAt : Date

    @CreateDateColumn()
    deleteAt : Date
}
