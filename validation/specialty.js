const Joi = require('@hapi/joi');
const schema = Joi.object({
    specialtyName: Joi.string().required(),
    specialtyDescription: Joi.string(),
    image: Joi.string(),
    specialtyNameArabic: Joi.string(),
    specialtyDescriptionArabic: Joi.string(),
    imageArabic: Joi.string(),
})
module.exports = schema;
