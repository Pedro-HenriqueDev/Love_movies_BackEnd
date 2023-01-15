import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity("users_movies")
export class Users_Movies {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => User, user => user.movies)
    @JoinColumn({name: 'user_id'})
    user_id: User

    @Column({type: "int", nullable: false})
    movie_id: number
}