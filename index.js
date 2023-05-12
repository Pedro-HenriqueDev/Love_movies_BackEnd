"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./dist/data-source");
const routes_1 = __importDefault(require("./dist/routes"));
const cors_1 = __importDefault(require("cors"));
const authMiddleware_1 = require("./dist/middlewares/authMiddleware");
const allowedOrigins = ['https://love-movie.vercel.app'];
const port = process.env.PORT || 3000;
data_source_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    const options = {
        origin: allowedOrigins,
        methods: ["GET", "OPTIONS", "PUT", "POST", "DELETE"],
    };
    app.use((0, cors_1.default)(options));
    app.use(express_1.default.json());
    app.use(routes_1.default);
    app.use(authMiddleware_1.celebrateErrorValidator);
    return app.listen(port);
});
