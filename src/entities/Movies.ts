import { Column, Entity , ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity("movies")
export class Movies {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => User, user => user.movies, {
        onDelete: 'CASCADE',
    })
    user: User

    @Column({type: "int", nullable: false})
    movie: number
}