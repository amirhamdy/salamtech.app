const Joi = require('@hapi/joi');
const schema = Joi.object({
    user: Joi.any().required(),
    logo: Joi.string(),
    thumbnail: Joi.string(),
    phoneNumber: Joi.string().required(),
    rate: Joi.number(),
    workingHour: Joi.array().length(7).unique('name').unique('day').items({
        day: Joi.string().required().equal(1).equal(2).equal(3).equal(4).equal(5).equal(6).equal(7),
        name: Joi.string().required().equal("sunday").equal("monday").equal("tuesday").equal("wednesday").equal("thursday").equal("friday").equal("saturday"),
        start: Joi.string().required(),
        end: Joi.string().required(),
        duration: Joi.string().required(),
        status: Joi.string().required().equal("on").equal("off")
    }),
    address: Joi.object().keys({
        address: Joi.string().required(),
        lat: Joi.any().required(),
        lng: Joi.any().required(),
        buliding: Joi.any(),
        floor: Joi.any(),
        apartment_number: Joi.any(),
        address_line: Joi.any()
    }),
    dob: Joi.date().required(),
    gender: Joi.string().required(),
    levelOfSeniority: Joi.string().required(),
    specializations: Joi.array().required(),
    fess: Joi.any().required(),
    documents: Joi.array().required(),
    subSpecializations: Joi.string().required(),
    eductionCertificate: Joi.string().required()
})
module.exports = schema;
