"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formUserValidator = void 0;
const celebrate_1 = require("celebrate");
const formUserValidator = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required().min(4),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required().min(8)
    })
};
exports.formUserValidator = formUserValidator;
