var modal = require("../models/profileDoctor");
var mongoose = require("mongoose");
var _ = require("lodash");
var validation = require("../validation/profile-doctor");
var doctorHelper = require("../helper/doctor-helper");
var defaultResponse = require("../helper/default-response");
const {User} = require('../models/user');
const {roles} = require('../globals');

const controller = {
  getTopDoctors: async (req, res) => {
    let doctors = await User.find({userRole: roles.Doctor}).select('_id fullName');
    if (_.isEmpty(doctors))
      return defaultResponse.failure(res, "Failed to fetch doctors.");

    return defaultResponse.success(res, "Successfully fetched.", {doctors});
  },
  getCountOfDoctor: (req, resp) => {
    const specializations = req.query.specializations;
    const name = req.query.name;
    let params = doctorHelper.params(specializations, name);
    modal.aggregate([
      {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user",},},
      {$unwind: "$user"}, {"$match": params,},
      {$group: {_id: null, count: {$sum: 1}}}, {$project: {_id: 0}}
    ]).then((Res) => {
      defaultResponse.success(resp, Res, "GET Success")
    }).catch((err) => {
      defaultResponse.failure(resp, err.message, [err.message])
    })
  },
  getDoctors: (req, resp) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const specializations = req.query.specializations;
    const name = req.query.name;
    let params = doctorHelper.params(specializations, name);
    modal.aggregate([
      {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user",},},
      {$unwind: "$user"}, {$skip: offset}, {$limit: limit},
      {"$match": {...params},},
    ]).exec((err, Res) => {
      if (err) {
        defaultResponse.failure(resp, err.message, [err.message])
      } else {
        defaultResponse.success(resp, Res, "GET Success")
      }
    })
  },
  getSingleDoctor: (req, resp) => {
    modal.aggregate([
      {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user",},},
      {$unwind: "$user"},
      {$match: {_id: mongoose.Types.ObjectId(req.params.id)},},
    ]).exec((err, Res) => {
      if (err) {
        defaultResponse.failure(resp, err.message, [err.message])
      } else {
        defaultResponse.success(resp, Res[0], "GET Success")
      }
    })
  },
  getSingleDoctorForUserId: (req, resp) => {
    modal.aggregate([
      {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user",},},
      {$unwind: "$user"},
      {$match: {"user._id": mongoose.Types.ObjectId(req.params.id)},},
    ]).exec((err, Res) => {
      if (err) {
        defaultResponse.failure(resp, err.message, [err.message])
      } else {
        defaultResponse.success(resp, Res[0], "GET Success")
      }
    })
  },

  insertDoctor: (req, resp) => {
    const specializationsWithObjectId = req.body.specializations.map(v => mongoose.Types.ObjectId(v));
    const user = new modal({
      _id: mongoose.Types.ObjectId(),
      user: req.body.user,
      logo: req.body.logo,
      thumbnail: req.body.thumbnail,
      phoneNumber: req.body.phoneNumber,
      workingHour: req.body.workingHour,
      address: req.body.address,
      dob: req.body.dob,
      gender: req.body.gender,
      levelOfSeniority: req.body.levelOfSeniority,
      specializations: specializationsWithObjectId,
      fess: req.body.fess,
      eductionCertificate: req.body.eductionCertificate,
      documents: req.body.documents,
      subSpecializations: req.body.subSpecializations,
    })

    const valid = validation.validate(req.body, {abortEarly: false})
    if (valid.error) {
      defaultResponse.failure(resp, "validation Error", valid.error.details.map(v => v.message))
    } else {
      user.save().then((Res) => {
        defaultResponse.success(resp, "", "Create Success")

      }).catch((err) => {
        if (err.message.includes('duplicate')) {
          defaultResponse.failure(resp, "User Is Already Added In Profile Doctor", ["User Is Already Added In Profile Doctor"])
        } else {
          defaultResponse.failure(resp, err.message, [err.message])
        }
      })
    }
  },
  updateDoctor: (req, resp) => {
    const specializationsWithObjectId = req.body.specializations.map(v => mongoose.Types.ObjectId(v));
    const user = {
      user: req.body.user,
      logo: req.body.logo,
      thumbnail: req.body.thumbnail,
      phoneNumber: req.body.phoneNumber,
      workingHour: req.body.workingHour,
      address: req.body.address,
      dob: req.body.dob,
      gender: req.body.gender,
      levelOfSeniority: req.body.levelOfSeniority,
      specializations: specializationsWithObjectId,
      fess: req.body.fess,
      eductionCertificate: req.body.eductionCertificate,
      documents: req.body.documents,
      subSpecializations: req.body.subSpecializations,
    }
    const valid = validation.validate(user, {abortEarly: false});
    if (valid.error) {
      defaultResponse.failure(resp, "validation Error", valid.error.details.map(v => v.message))
    } else {
      modal.updateOne({user: req.body.user}, {$set: user}, {upsert: true}).then((Res) => {
        defaultResponse.success(resp, "", "Update Success")
      }).catch((err) => {
        if (err.message.includes('duplicate')) {
          defaultResponse.failure(resp, "User Is Already Added In Profile Doctor", ["User Is Already Added In Profile Doctor"])
        } else {
          defaultResponse.failure(resp, err.message, [err.message])
        }
      })
    }
  },
  deleteDoctor: (req, resp) => {
    modal.deleteOne({user: req.params.id}).then((Res) => {
      defaultResponse.success(resp, "", "Delete Success")
    }).catch((err) => {
      defaultResponse.failure(resp, err.message, [err.message])

    })
  }

};

module.exports = controller;
