import { AppDataSource } from "../data-source";
import { Users_Movies } from "../entities/Users_Movies";

export const UserRepository = AppDataSource.getRepository(Users_Movies)