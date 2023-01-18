"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.celebrateErrorValidator = exports.authMiddlewareEmailVerification = exports.authMiddlewareParam = exports.authMiddleware = void 0;
const UserRepositories_1 = require("../repositories/UserRepositories");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const celebrate_1 = require("celebrate");
const authMiddleware = async (req, res, next) => {
    var _a;
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: "Not authorized" });
    }
    const token = authorization.split(" ")[1];
    jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', async function (err, decoded) {
        console.log("fqefq");
        if (err != null) {
            return res.status(401).json({ message: "Not authorized" });
        }
        if (!decoded) {
            return res.status(401).json({ message: "Not authorized" });
        }
        let { email } = decoded;
        if (!email) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const user = await UserRepositories_1.UserRepository.findOneBy({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const { password: _, ...loggeedUser } = user;
        req.user = loggeedUser;
        next();
    });
};
exports.authMiddleware = authMiddleware;
const authMiddlewareParam = async (req, res, next) => {
    var _a;
    const token = req.params.token;
    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }
    const { email } = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '');
    const user = await UserRepositories_1.UserRepository.findOneBy({ email });
    if (!user) {
        return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
};
exports.authMiddlewareParam = authMiddlewareParam;
const authMiddlewareEmailVerification = async (req, res, next) => {
    var _a;
    const token = req.params.token;
    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }
    const { name, email, password } = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '');
    const userExist = await UserRepositories_1.UserRepository.findOneBy({ email });
    if (userExist) {
        return res.status(401).json({ message: "User exist!" });
    }
    req.user = { name, email, password };
    next();
};
exports.authMiddlewareEmailVerification = authMiddlewareEmailVerification;
const celebrateErrorValidator = async (err, req, res, next) => {
    if (err instanceof celebrate_1.CelebrateError) {
        const errorBody = err.details.get('body');
        return res.status(400).json({
            message: errorBody === null || errorBody === void 0 ? void 0 : errorBody.message
        });
    }
    return;
};
exports.celebrateErrorValidator = celebrateErrorValidator;
