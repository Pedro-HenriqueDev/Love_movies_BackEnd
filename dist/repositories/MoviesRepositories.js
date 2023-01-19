"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesRepository = void 0;
const data_source_1 = require("../data-source");
const Movies_1 = require("../entities/Movies");
exports.MoviesRepository = data_source_1.AppDataSource.getRepository(Movies_1.Movies);
