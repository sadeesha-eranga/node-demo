const { Joi } = require('express-validation');

module.exports = {
    registerUser: {
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
            firstName: Joi.string().required(),
            lastName: Joi.string(),
            email: Joi.string().email().required()
        })
    },
    authenticateUser: {
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        })
    }
}
