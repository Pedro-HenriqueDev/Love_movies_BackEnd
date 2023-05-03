"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserRepositories_1 = require("../repositories/UserRepositories");
const config_1 = require("../nodemailer/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer = __importStar(require("nodemailer"));
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
        let transport = nodemailer.createTransport(config_1.configMail);
        await transport.sendMail((0, config_1.mailVerification)(email, token)).then((result) => {
            console.log(result);
            return res.json("A verification email has been sent to your email");
        }).catch(err => {
            return res.status(500).json({ err: "Internal server Error" });
        });
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
        const userEmail = req.body.email;
        const password = req.body.password;
        const user = await UserRepositories_1.UserRepository.findOneBy({ email: userEmail });
        if (!user) {
            return res.status(400).json({ message: "Email or password invalid" });
        }
        const verifyPass = await bcrypt_1.default.compare(password, user.password);
        if (!verifyPass) {
            return res.status(400).json({ message: "Email or password invalid" });
        }
        await UserRepositories_1.UserRepository.remove(user);
        const { password: _, ...userDeleted } = user;
        return res.json({ user: userDeleted, message: "User deleted successfully" });
    }
}
exports.UserController = UserController;
