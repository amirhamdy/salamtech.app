var modal = require("../models/lab");
var userModal = require('../models/user');
var mongoose = require("mongoose");
const locationModel = require('../helper/distance');
const labHelper = require("../helper/lab-helper");
var _ = require("lodash");
var validation = require("../validation/lab");
var defaultResponse = require("../helper/default-response");


const controller = {
    count: (req, resp) => {
        const isLab = Number(req.query.isLab);
        const name = req.query.name;
        const arabicName = req.query.arabicName;
        const lat = req.query.lat;
        const lng = req.query.lng;
        const dist = Number(req.query.dist) * 1000
        let params = labHelper.params(isLab, name, arabicName, lat, lng, dist);
        modal.count({ ...params }).then((Res) => {
            defaultResponse.success(resp, Res, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })

    },
    getLabsAndPharmacies: async (req, resp) => {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const isLab = Number(req.query.isLab);
        const name = req.query.name;
        const arabicName = req.query.arabicName;
        const lat = req.query.lat;
        const lng = req.query.lng;
        const dist = Number(req.query.dist) * 1000
        let params = labHelper.params(isLab, name, arabicName, lat, lng, dist);
        modal.find({ ...params }).skip(offset).limit(limit).then((Res) => {
            var clonedArray = Res;
            if (lat && lng && dist) {
                clonedArray = locationModel.distance(Res, lat, lng, dist);
            }
            defaultResponse.success(resp, clonedArray, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })
    },
    getSingleLabOrPharmacy: (req, resp) => {
        modal.findOne({ _id: req.params.id }).then((Res) => {
            defaultResponse.success(resp, Res, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })
    },
    getSingleLabOrPharmacyForUserId: (req, resp) => {
        modal.findOne({ user: req.params.id }).then((Res) => {
            defaultResponse.success(resp, Res, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })
    },

    insertLabOrPharmacy: (req, resp) => {
        let data = {
            _id: mongoose.Types.ObjectId(),
            arabicThumbnail: req.body.arabicThumbnail,
            name: req.body.name,
            arabicName: req.body.arabicName,
            arabicLogo: req.body.arabicLogo,
            user: req.body.user,
            logo: req.body.logo,
            thumbnail: req.body.logo,
            phoneNumber: req.body.phoneNumber,
            branch: req.body.branch,
            numberOfBranches: req.body.branch.length,
            isActive: req.body.isActive || false,
        }
        userModal.findOne({ _id: req.body.user }).then((Res) => {
            if (Res) {
                data = labHelper.doctorInsertCheckTypes(Res, data);
                const valid = validation.validate(data, { abortEarly: false, allowUnknown: true });
                if (valid.error) {
                    defaultResponse.failure(resp, "validation Error", valid.error.details.map(v => v.message))
                } else {
                    const sendingData = new modal(data);
                    sendingData.save().then((Res) => {
                        defaultResponse.success(resp, "", "Create Success")

                    }).catch((err) => {
                        defaultResponse.failure(resp, err.message, [err.message])
                    })
                }
            } else {
                defaultResponse.failure(resp, "No User", ['User Not Found'])
            }

        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })
    },
    updateLabOrPharmacy: (req, resp) => {
        let data = {
            _id: req.body._id,
            arabicThumbnail: req.body.arabicThumbnail,
            name: req.body.name,
            arabicName: req.body.arabicName,
            arabicLogo: req.body.arabicLogo,
            logo: req.body.logo,
            thumbnail: req.body.logo,
            phoneNumber: req.body.phoneNumber,
            branch: req.body.branch,
            numberOfBranches: req.body.branch.length,
            isActive: req.body.isActive || false,
            user: req.body.user
        }

        userModal.findOne({ _id: req.body.user }).then((Res) => {
            if (Res) {
                data = labHelper.doctorInsertCheckTypes(Res, data);
                const valid = validation.validate(data, { abortEarly: false, allowUnknown: true });
                if (valid.error) {
                    defaultResponse.failure(resp, "validation Error", valid.error.details.map(v => v.message))
                } else {
                    const sendingData = new modal(data);
                    modal.updateOne({ user: req.body.user }, { $set: sendingData }, { upsert: true }).then((Res) => {
                        defaultResponse.success(resp, "", "Update Success")
                    }).catch((err) => {
                        if (err.message.includes('duplicate')) {
                            defaultResponse.failure(resp, "User Is Already Added On This Profile", ["User Is Already Added On This Profile "])
                        } else if (err.message.includes('_id')) {
                            defaultResponse.failure(resp, "Must Send _id Flied To this Api", ["Must Send _id Flied To this Api "])
                        } else {
                            defaultResponse.failure(resp, err.message, [err.message])
                        }
                    })
                }
            } else {
                defaultResponse.failure(resp, 'No User', ['User Not Found'])
            }

        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })


    },
    deleteLabOrPharmacy: (req, resp) => {
        modal.deleteOne({ user: req.params.id }).then((Res) => {
            defaultResponse.success(resp, "", "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])

        })
    }

};
module.exports = controller;
