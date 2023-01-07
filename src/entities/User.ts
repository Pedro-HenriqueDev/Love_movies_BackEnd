import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, type: "text"})
    name: string

    @Column({type: "text",nullable: false,unique: true})
    email: string

    @Column({type: "text"})
    password: string
}