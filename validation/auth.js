const Joi = require('@hapi/joi');
const schema = Joi.object({
    fullName: Joi.string().min(6).required(),
    // password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/)).min(8).required(),
    password: Joi.string().min(8).required(),

    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    isActive: Joi.boolean().required(),
    verificationCode: Joi.number().required(),
    userRole: Joi.string().required()
})
module.exports = schema;
 