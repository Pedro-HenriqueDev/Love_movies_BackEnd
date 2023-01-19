import { AppDataSource } from "../data-source";
import { Movies } from "../entities/Movies";

export const MoviesRepository = AppDataSource.getRepository(Movies)