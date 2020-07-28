const Joi = require('@hapi/joi');

const schema = {
    addPatientValidation: Joi.object({
        name: Joi.string().required(),
        profilePic: Joi.string(),
        dob: Joi.date().required(),
        gender: Joi.string(),
        rate: Joi.number(),
        address: Joi.object({
            long: Joi.number().required(),
            lat: Joi.number().required(),
            addressName: Joi.string(),
            buildingInfo: Joi.string(),
            floor: Joi.number(),
            apartmentNumber: Joi.number(),
            addressLine: Joi.string()
        }).required(),
        insuranceCard: Joi.string(),
        height: Joi.number(),
        weight: Joi.number(),
        bloodPressure: Joi.object({
            upper: Joi.number(),
            lower: Joi.number()
        }),
        sugarLevel: Joi.number(),
        bloodType: Joi.string(),
        allergies: Joi.array(),
        prescriptions: Joi.array(),
        familyMembers: Joi.array().items({
            relationship: Joi.string().required(),
            fullName: Joi.string().required(),
            phone: Joi.string()
        }),
        points: Joi.number(),
        user: Joi.string()
    }),
    updatePatientValidation: Joi.object({
        name: Joi.string(),
        profilePic: Joi.string(),
        dob: Joi.date(),
        gender: Joi.string(),
        rate: Joi.number(),
        address: Joi.object({
            long: Joi.number().required(),
            lat: Joi.number().required(),
            addressName: Joi.string(),
            buildingInfo: Joi.string(),
            floor: Joi.number(),
            apartmentNumber: Joi.number(),
            addressLine: Joi.string()
        }),
        insuranceCard: Joi.string(),
        height: Joi.number(),
        weight: Joi.number(),
        bloodPressure: Joi.object({
            upper: Joi.number(),
            lower: Joi.number()
        }),
        sugarLevel: Joi.number(),
        bloodType: Joi.string(),
        allergies: Joi.array(),
        prescriptions: Joi.array(),
        familyMembers: Joi.array().items({
            relationship: Joi.string().required(),
            fullName: Joi.string().required(),
            phone: Joi.string()
        }),
        points: Joi.number(),
        user: Joi.string()
    })

}

module.exports = schema;


