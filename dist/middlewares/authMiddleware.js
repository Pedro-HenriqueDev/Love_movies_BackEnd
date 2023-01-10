"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewareEmailVerification = exports.authMiddlewareParam = exports.authMiddleware = void 0;
const api_erros_1 = require("../helpers/api-erros");
const UserRepositories_1 = require("../repositories/UserRepositories");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = async (req, res, next) => {
    var _a;
    const { authorization } = req.headers;
    if (!authorization) {
        throw new api_erros_1.UnauthorizedError("Not authorized");
    }
    const token = authorization.split(" ")[2];
    const { id } = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '');
    const user = await UserRepositories_1.UserRepository.findOneBy({ id });
    if (!user) {
        throw new api_erros_1.UnauthorizedError("Not authorized");
    }
    const { password: _, ...loggeedUser } = user;
    req.user = loggeedUser;
    next();
};
exports.authMiddleware = authMiddleware;
const authMiddlewareParam = async (req, res, next) => {
    var _a;
    const token = req.params.token;
    if (!token) {
        throw new api_erros_1.UnauthorizedError("Not authorized");
    }
    const { email } = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '');
    const user = await UserRepositories_1.UserRepository.findOneBy({ email });
    if (!user) {
        throw new api_erros_1.UnauthorizedError("Not authorized");
    }
    req.user = user;
    next();
};
exports.authMiddlewareParam = authMiddlewareParam;
const authMiddlewareEmailVerification = async (req, res, next) => {
    var _a;
    const token = req.params.token;
    if (!token) {
        throw new api_erros_1.UnauthorizedError("Not authorized");
    }
    const { name, email, password } = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '');
    const userExist = await UserRepositories_1.UserRepository.findOneBy({ email });
    if (userExist) {
        throw new api_erros_1.BadRequestError("Email is already registered");
    }
    req.user = { name, email, password };
    next();
};
exports.authMiddlewareEmailVerification = authMiddlewareEmailVerification;
