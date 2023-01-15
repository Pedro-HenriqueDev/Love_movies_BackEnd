import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Users_Movies } from "./Users_Movies";

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

    @OneToMany(() => Users_Movies, movies => movies.user_id)
    movies: Users_Movies[]
}