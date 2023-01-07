"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = require("./controllers/LoginController");
const RecoveryController_1 = require("./controllers/RecoveryController");
const Usercontroller_1 = require("./controllers/Usercontroller");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const routes = (0, express_1.Router)();
routes.post("/user", new Usercontroller_1.UserController().cadastre);
routes.get("/completeregistration/:token", authMiddleware_1.authMiddlewareEmailVerification, new Usercontroller_1.UserController().completeRegistration);
routes.post("/login", new LoginController_1.LoginSistem().login);
routes.get("/profile", authMiddleware_1.authMiddleware, new LoginController_1.LoginSistem().getProfile);
routes.post("/forgotpassword", new RecoveryController_1.RecoveryPassword().forgotPasswort);
routes.post("/recoverpassword/:token", authMiddleware_1.authMiddlewareParam, new RecoveryController_1.RecoveryPassword().recoveryPassword);
exports.default = routes;
