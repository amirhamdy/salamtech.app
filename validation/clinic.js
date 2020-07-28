const Joi = require('@hapi/joi');

const schema = {
    addClinicValidation: Joi.object({
        name: Joi.string().required(),
        specialisations: Joi.array(),
        logo: Joi.string(),
        thumbnail: Joi.string(),
        rate: Joi.number(),
        operatingHours: Joi.object({
            start: Joi.string(),
            end: Joi.string()
        }),
        operatingDays: Joi.array().items({
            day: Joi.string()
        }),
        address: Joi.object({
            long: Joi.number().required(),
            lat: Joi.number().required(),
            addressName: Joi.string().required(),
            buildingInfo: Joi.string(),
            floor: Joi.number(),
            apartmentNumber: Joi.number(),
            addressLine: Joi.string()
        }).required(),
        services: Joi.array().items({
                name: Joi.string(),
                price: Joi.number()
            }),
        amenities: Joi.array().items({
            name: Joi.string()
        }),
        gallery : Joi.array().items({
                image: Joi.string()
            }),
        registrationCertificate: Joi.string(),
        website: Joi.string(),
        doctors: Joi.array(),
        isActive: Joi.bool(),
        user: Joi.string(),
    }),
    updateClinicValidation: Joi.object({
        name: Joi.string().required(),
        specialisations: Joi.array(),
        logo: Joi.string(),
        thumbnail: Joi.string(),
        rate: Joi.number(),
        operatingHours: Joi.object({
            start: Joi.string(),
            end: Joi.string()
        }),
        operatingDays: Joi.array().items({
            day: Joi.string()
        }) ,
        address: Joi.object({
            long: Joi.number(),
            lat: Joi.number(),
            addressName: Joi.string(),
            buildingInfo: Joi.string(),
            floor: Joi.number(),
            apartmentNumber: Joi.number(),
            addressLine: Joi.string()
        }),
        services: Joi.array().items({
                name: Joi.string(),
                price: Joi.number()
            }),
        amenities: Joi.array().items({
            name: Joi.string()
        }),
        gallery : Joi.array().items({
                image: Joi.string()
            }),
        registrationCertificate: Joi.string(),
        website: Joi.string(),
        doctors: Joi.array(),
        isActive: Joi.bool(),
        user: Joi.string(),
    })
}

module.exports = schema;


