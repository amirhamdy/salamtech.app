const Joi = require('@hapi/joi');
const schema = Joi.object({
    name: Joi.any().required(),
    user: Joi.any().required(),
    arabicName: Joi.string().required(),
    logo: Joi.string(),
    arabicLogo: Joi.string(),
    thumbnail: Joi.string(),
    arabicThumbnail: Joi.string(),
    phoneNumber: Joi.string().required(),
    rate: Joi.number(),
    branch: Joi.array().allow().items({
        workingHour: Joi.array().length(7).unique('name').unique('day').items({
            day: Joi.string().required().equal(1).equal(2).equal(3).equal(4).equal(5).equal(6).equal(7),
            name: Joi.string().required().equal("sunday").equal("monday").equal("tuesday").equal("wednesday").equal("thursday").equal("friday").equal("saturday"),
            start: Joi.string().required(),
            end: Joi.string().required(),
            status: Joi.string().required().equal("on").equal("off")
        }),
        address: Joi.object().keys({
            address_name: Joi.string().required(),
            lat: Joi.any().required(),
            lng: Joi.any().required(),
            building_info: Joi.any(),
            floor: Joi.any(),
            apartment_number: Joi.any(),
            address_line: Joi.any(),
            location: Joi.any()
        }),
        phoneNumber: Joi.string().required(),
        isDeliveryAvailable: Joi.boolean(),
        isHomeSampleAvailable: Joi.boolean()
    }),
    numberOfBranches: Joi.number().required(),
    isActive: Joi.boolean().required(),
    isLab: Joi.any().required(),
    _id: Joi.any(),
})
module.exports = schema;
