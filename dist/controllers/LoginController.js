"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSistem = void 0;
const api_erros_1 = require("../helpers/api-erros");
const UserRepositories_1 = require("../repositories/UserRepositories");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginSistem {
    async login(req, res) {
        var _a;
        const { email, password } = req.body;
        const user = await UserRepositories_1.UserRepository.findOneBy({ email });
        if (!user) {
            throw new api_erros_1.BadRequestError("Email ou senha invalidos");
        }
        const verifyPass = await bcrypt_1.default.compare(password, user.password);
        if (!verifyPass) {
            throw new api_erros_1.BadRequestError("Email ou senha invalidos");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', { expiresIn: '2d' });
        const { password: _, ...userLogin } = user;
        return res.json({ user: userLogin, token });
    }
    async getProfile(req, res) {
        return res.json(req.user);
    }
}
exports.LoginSistem = LoginSistem;
