var modal = require("../models/rateDotor");
var moment = require("moment");
var mongoose = require("mongoose");
var doctorProfileModel = require("../models/profileDoctor");
var labProfileModel = require("../models/lab");
var clinicProfileModel = require("../models/clinic");

var defaultResponse = require("../helper/default-response");
var rateValidation = require("../validation/rate");
const controller = {
    getAllRates: (req, resp) => {
        modal.find().lean().populate("user doctor").then((Res) => {
            defaultResponse.success(resp, Res, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])
        })
    },
    singleRateForReceiver: async (req, resp) => {
        modal.find({ receiver: req.params.id }).lean().then((Res) => {
            defaultResponse.success(resp, Res, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])

        })
    },
    singleRateForUser: (req, resp) => {
        modal.find({ user: req.params.id }).lean().then((Res) => {
            defaultResponse.success(resp, Res, "GET Success")
        }).catch((err) => {
            defaultResponse.failure(resp, err.message, [err.message])

        })
    },

    insertRate: (req, resp) => {
        const rate = new modal({
            _id: mongoose.Types.ObjectId(),
            user: req.body.user,
            receiver: req.body.receiver,
            rate: req.body.rate,
            rateFor: req.body.rateFor,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss")
        })
        const valid = rateValidation.validate(req.body, { abortEarly: false });
        if (valid.error) {
            defaultResponse.failure(resp, "validation Error", valid.error.details.map(v => v.message))

        } else {
            rate.save().then(async (Res) => {
                try {
                    const receiverRates = await modal.aggregate([
                        { $match: { receiver: mongoose.Types.ObjectId(req.body.receiver) }, },
                        { $group: { _id: null, total: { $sum: '$rate' }, count: { $sum: 1 } } },
                    ]);
                    const ratePercentage = (receiverRates[0].total / receiverRates[0].count).toFixed(1);
                    const user = { rate: ratePercentage };

                    req.body.rateFor == 'clinic'
                        && await clinicProfileModel.updateOne({ user: req.body.receiver }, { $set: user }, { upsert: true });

                    req.body.rateFor == 'doctor'
                        && await doctorProfileModel.updateOne({ user: req.body.receiver }, { $set: user }, { upsert: true });

                    (req.body.rateFor == 'lab' || req.body.rate === 'pharmacy')
                        && await labProfileModel.updateOne({ user: req.body.receiver }, { $set: user }, { upsert: true });

                    defaultResponse.success(resp, "", "Update Success")
                } catch (error) {
                    defaultResponse.failure(resp, error, [error])
                }
            }).catch((err) => {
                defaultResponse.failure(resp, err.message, [err.message])
            })
        }
    },


};
module.exports = controller;
