"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const error_1 = require("./middlewares/error");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const port = process.env.PORT || 3000;
data_source_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(routes_1.default);
    app.use(error_1.errorMiddleware);
    return app.listen(port);
});
