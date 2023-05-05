"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserRepositories_1 = require("../repositories/UserRepositories");
const config_1 = require("../sendGrid/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    async index(req, res) {
        return res.json("Welcome, Registration and login system, Pedro Henrique");
    }
    async cadastre(req, res) {
        var _a;
        const { name, email, password } = req.body;
        const userExist = await UserRepositories_1.UserRepository.findOneBy({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const user = { name, email, password: hashPassword };
        const token = jsonwebtoken_1.default.sign(user, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', { expiresIn: '1h' });
        const emailResult = await (0, config_1.sendEmail)((0, config_1.mailVerification)(email, token), "A verification email has been sent to your email");
        return res.status(emailResult.status).json(emailResult.message);
    }
    async completeRegistration(req, res) {
        const user = req.user;
        await UserRepositories_1.UserRepository.save(user);
        return res.status(201).json("Account created!");
    }
    async getUsers(req, res) {
        const users = await UserRepositories_1.UserRepository.find({ select: { id: true, email: true, name: true } });
        return res.json(users);
    }
    async deleteUser(req, res) {
        const id = req.user.id;
        const password = req.body.password;
        const user = await UserRepositories_1.UserRepository.findOneBy({ id });
        if (!user) {
            return res.status(400).json({ message: "Email or password invalid" });
        }
        const verifyPass = await bcrypt_1.default.compare(password, user.password);
        console.log(verifyPass, user);
        if (!verifyPass) {
            return res.status(400).json({ message: "Email or password invalid" });
        }
        const userDeleted = await UserRepositories_1.UserRepository.remove(user);
        return res.json({ userDeleted, message: "User deleted successfully" });
    }
}
exports.UserController = UserController;
