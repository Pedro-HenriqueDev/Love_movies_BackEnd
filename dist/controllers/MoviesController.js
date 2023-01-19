"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const MoviesRepositories_1 = require("../repositories/MoviesRepositories");
const UserRepositories_1 = require("../repositories/UserRepositories");
class MoviesController {
    async getAllRelations(req, res) {
        const id = req.user.id;
        const user = await UserRepositories_1.UserRepository.findOneBy({ id });
        if (!user) {
            return res.status(404).json({ message: "User does not found" });
        }
        const moviesRelations = await MoviesRepositories_1.MoviesRepository.find({ where: { user }, relations: { user: true }, select: { id: true, movie: true, user: { id: true } } });
        return res.json(moviesRelations);
    }
    async create(req, res) {
        const id = req.user.id;
        const idMovie = req.body.idMovie;
        if (!id) {
            return res.status(401).json({ message: "User invalid" });
        }
        const user = await UserRepositories_1.UserRepository.findOneBy({ id });
        if (!user) {
            return res.status(404).json({ message: "User does not found" });
        }
        const relationMovie = await MoviesRepositories_1.MoviesRepository.find({ where: { movie: idMovie } });
        if (!relationMovie) {
            return res.status(400).json({ message: "User has this relationship" });
        }
        const userMovieRelation = {
            user: user,
            movie: idMovie
        };
        let relationCreated = await MoviesRepositories_1.MoviesRepository.save(userMovieRelation);
        const relation = {
            id: relationCreated.id,
            movie: relationCreated.movie,
            user: relationCreated.user.id
        };
        return res.status(201).json({ message: "Relation Created", relation: relation });
    }
    async delete(req, res) {
        const id = req.user.id;
        const idMovie = req.body.idMovie;
        if (!id) {
            return res.status(401).json({ message: "User invalid" });
        }
        const user = await UserRepositories_1.UserRepository.findOneBy({ id });
        if (!user) {
            return res.status(404).json({ message: "User does not found" });
        }
        const relationUserMovie = await MoviesRepositories_1.MoviesRepository.findOneBy({ movie: idMovie });
        if (!relationUserMovie) {
            return res.status(404).json({ message: "relationship movie not found" });
        }
        let relationDeleted = await MoviesRepositories_1.MoviesRepository.remove(relationUserMovie);
        return res.status(200).json({ message: "Relation Deleted", relation: relationDeleted });
    }
}
exports.MoviesController = MoviesController;
