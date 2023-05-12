"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryPassword = void 0;
const UserRepositories_1 = require("../repositories/UserRepositories");
const config_1 = require("../sendGrid/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class RecoveryPassword {
    async forgotPasswort(req, res) {
        var _a;
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email required" });
        }
        const user = await UserRepositories_1.UserRepository.findOneBy({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', { expiresIn: '1h' });
        const emailResult = await (0, config_1.sendEmail)((0, config_1.mailContent)(email, token), "Recovery link sent to your email");
        res.status(emailResult.status).json(emailResult.message);
    }
    async recoveryPassword(req, res) {
        const user = await UserRepositories_1.UserRepository.findOneBy({ id: req.user.id });
        const newPass = req.body.password;
        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }
        const hash = await bcrypt_1.default.hash(newPass, 10);
        user.password = hash;
        await UserRepositories_1.UserRepository.save(user);
        return res.json("Ok, your password has been changed");
    }
}
exports.RecoveryPassword = RecoveryPassword;
