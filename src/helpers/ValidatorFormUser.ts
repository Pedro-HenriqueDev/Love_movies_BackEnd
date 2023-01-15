import {Joi, Segments} from 'celebrate'

const formUserValidator = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(4),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8)
    })
}

export {
    formUserValidator
}