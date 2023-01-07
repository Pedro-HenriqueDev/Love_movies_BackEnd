import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const UserRepository = AppDataSource.getRepository(User)