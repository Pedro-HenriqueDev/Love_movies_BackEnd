"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const data_source_1 = require("../data-source");
const Users_Movies_1 = require("../entities/Users_Movies");
exports.UserRepository = data_source_1.AppDataSource.getRepository(Users_Movies_1.Users_Movies);
