var Sepcialty = require("../models/specialty");
var moment = require("moment");
var mongoose = require("mongoose");
var validation = require("../validation/specialty");
var defaultResponse = require("../helper/default-response");

const controller = {
    getAllSpecialties: (req, resp) => {
        Sepcialty.find().lean().then((Res) => {
            defaultResponse.success(resp, Res, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })
    },
    getAllSpecialtiesForArabicLanguage: (req, resp) => {
        Sepcialty.find().lean().then((Res) => {
            const data = Res.map(v => v = {
                _id: v._id,
                specialtyName: v.specialtyNameArabic,
                specialtyDescription: v.specialtyDescriptionArabic,
                image: v.imageArabic,
            })
            defaultResponse.success(resp, data, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })
    },
    getAllSpecialtiesEnglishLanguage: (req, resp) => {
        Sepcialty.find().lean().then((Res) => {
            const data = Res.map(v => v = {
                _id: v._id,
                specialtyName: v.specialtyName,
                specialtyDescription: v.specialtyDescription,
                image: v.image,
            })
            defaultResponse.success(resp, data, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })
    },
    singleSpecialty: (req, resp) => {
        Sepcialty.findOne({ _id: req.params.id }).lean().then((Res) => {
            defaultResponse.success(resp, Res, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })
    },
    singleSpecialtyEnglishLanguage: (req, resp) => {
        Sepcialty.findOne({ _id: req.params.id }).lean().then((Res) => {
            const data = {
                _id: Res._id,
                specialtyName: Res.specialtyName,
                specialtyDescription: Res.specialtyDescription,
                image: Res.image,
            }
            defaultResponse.success(resp, data, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })

    },
    singleSpecialtyArabicLanguage: (req, resp) => {
        Sepcialty.findOne({ _id: req.params.id }).lean().then((Res) => {
            const data = {
                _id: Res._id,
                specialtyName: Res.specialtyNameArabic,
                specialtyDescription: Res.specialtyDescriptionArabic,
                image: Res.imageArabic,
            }
            defaultResponse.success(resp, data, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })

    },
    insertSpecialty: (req, resp) => {
        const specialty = new Sepcialty({
            _id: mongoose.Types.ObjectId(),
            specialtyName: req.body.specialtyName,
            specialtyDescription: req.body.specialtyDescription,
            image: req.body.image,
            specialtyNameArabic: req.body.specialtyNameArabic,
            specialtyDescriptionArabic: req.body.specialtyDescriptionArabic,
            imageArabic: req.body.imageArabic,
            // created_at: moment().format("YYYY-MM-DD HH:mm:ss")
        })
        const valid = validation.validate(req.body, { abortEarly: false });
        if (valid.error) {
            defaultResponse.failure(resp, "validation Error", valid.error.details.map(v => v.message))
        } else {
            specialty.save().then((Res) => {
                defaultResponse.success(resp, Res, "Creating Success")
            }).catch((err) => {
                defaultResponse.failure(resp, err.message, [err.message])
            })
        }
    },
    updateSpecialty: (req, resp) => {
        const specialty = {
            specialtyName: req.body.specialtyName,
            specialtyDescription: req.body.specialtyDescription,
            image: req.body.image,
            specialtyNameArabic: req.body.specialtyNameArabic,
            specialtyDescriptionArabic: req.body.specialtyDescriptionArabic,
            imageArabic: req.body.imageArabic,
            // updated_at: moment().format("YYYY-MM-DD HH:mm:ss")
        }
        const valid = validation.validate(specialty, { abortEarly: false });
        if (valid.error) {
            defaultResponse.failure(resp, "validation Error", valid.error.details.map(v => v.message))
        } else {
            Sepcialty.updateOne({ _id: req.body.specialtyId }, { $set: specialty }, { upsert: true }).then((Res) => {
                defaultResponse.success(resp, "", "Update Success")
            }).catch((err) => {
                defaultResponse.failure(resp, err.message, [err.message])
            })
        }
    },
    deleteSpecialty: (req, resp) => {
        Sepcialty.deleteOne({ _id: req.params.id }).then((Res) => {
            defaultResponse.success(resp, "", "Delete Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })
    }


};
module.exports = controller;
