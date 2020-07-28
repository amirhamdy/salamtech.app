const Joi = require('@hapi/joi');
const schema = Joi.object({
    user: Joi.any().required(),
    receiver: Joi.any().required(),
    rate: Joi.number().required(),
    rateFor: Joi.string().equal("user").equal("clinic").equal("hospital").equal("doctor").equal("lab").equal("pharmacy").required(),
    created_at: Joi.date(),
    updated_at: Joi.date()
})
module.exports = schema;
 