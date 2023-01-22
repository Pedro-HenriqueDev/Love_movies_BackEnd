import { Request, Response } from "express";
import { MoviesRepository } from "../repositories/MoviesRepositories";
import { UserRepository } from "../repositories/UserRepositories";

export class MoviesController {
    
    async getAllMovies(req: Request, res: Response) {
        const id = req.user.id

        const user = await UserRepository.findOneBy({id})
        
        if(!user) {
            return res.status(404).json({message: "User does not found"})
        }

        const movies = await MoviesRepository.find({where: {user},relations: {user: true},select: {id: true, movie: true, user: {id: true}}})

        return res.json(movies)
    }
    
    async getRelationsPagination(req: Request, res: Response) {
        const id = req.user.id
        let page = Number(req.query.page)
        if(!page) {
            page = 1
        }
        const user = await UserRepository.findOneBy({id})
        
        if(!user) {
            return res.status(404).json({message: "User does not found"})
        }

        const numberEntites = 20
        const pagination = (-1+page) * numberEntites

        const [movies, count] = await MoviesRepository.findAndCount({where: {user},relations: {user: true},select: {id: true, movie: true, user: {id: true}}, take: numberEntites, skip: pagination})

        const pages = count / numberEntites
        const allPages = Number.isInteger(pages)? pages : Math.round(Math.trunc(pages) + 1)

        const data = {
            data: movies,
            page,
            allPages,
            total_movies: count
        }
        return res.json(data)

    }
    async create(req: Request, res: Response) {
        const id = req.user.id
        const idMovie = req.body.idMovie

        if(!id) {
            return res.status(401).json({message: "User invalid"})
        }

        const user = await UserRepository.findOneBy({id})

        if(!user) {
            return res.status(404).json({message: "User does not found"})
        }
        const relationMovie = await MoviesRepository.find({where: {movie: idMovie}})
        
        if(!relationMovie) {
            return res.status(400).json({message: "User has this relationship"})
        }
        const userMovieRelation = {
            user: user,
            movie: idMovie
        }

        let relationCreated = await MoviesRepository.save(userMovieRelation)

        const relation = {
            id: relationCreated.id,
            movie: relationCreated.movie,
            user: relationCreated.user.id
        }
        return res.status(201).json({message: "Relation Created", relation: relation})
    }
    async delete(req: Request, res: Response) {
        const id = req.user.id
        const idMovie = req.body.idMovie

        if(!id) {
            return res.status(401).json({message: "User invalid"})
        }

        const user = await UserRepository.findOneBy({id})

        if(!user) {
            return res.status(404).json({message: "User does not found"})
        }

        const relationUserMovie = await MoviesRepository.findOneBy({movie: idMovie})

        if(!relationUserMovie) {
            return res.status(404).json({message: "relationship movie not found"})
        }

        let relationDeleted = await MoviesRepository.remove(relationUserMovie)

        return res.status(200).json({message: "Relation Deleted", relation: relationDeleted})
    }
}