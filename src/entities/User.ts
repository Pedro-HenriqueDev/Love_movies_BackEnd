import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Movies } from "./Movies";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({nullable: false, type: "text"})
    name: string

    @Column({type: "text",nullable: false,unique: true})
    email: string

    @Column({type: "text"})
    password: string

    @OneToMany(() => Movies, movies => movies.user)
    movies: Movies[]
}