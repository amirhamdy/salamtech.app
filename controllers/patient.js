const {User} = require('../models/user');
const {Patient} = require('../models/patient');
const {addPatientValidation, updatePatientValidation} = require("../validation/patient");
const defaultResponse = require("../helper/default-response");

const getPatientById = (logger) => {
  return async function (req, res, next) {
    try {
      const {patientId} = req.params;

      const patient = await Patient.findById(patientId)
        .populate("user")

      if (!patient) {
        res.status(404).json({
          default_response: {
            success: false,
            errors: err || err.errors,
            message: 'Can not find Patient ID'
          }
        })
      }

      return res.status(200).json({
        default_response: {
          success: true,
          errors: [],
          message: "Patient Data Fetched Successfully",
          date: {
            patient
          }
        }
      });


    } catch (err) {
      logger.log('error', err || err.errors);
      res.status(409).json({
        default_response: {
          success: false,
          errors: err || err.errors,
          message: err.message
        }
      })
    }
  }
}

const addPatient = (logger) => {
  return async function (req, res, next) {
    console.log(req.user)
    const {error, value} = addPatientValidation.validate(req.body);
    if (error) {
      res.status(422).json({
        default_response: {
          success: false,
          errors: error.details,
          message: error.details[0].message
        }
      })
      return;
    }


    try {
      const user = req.user._id;
      if (!user) {
        res.status(401).json({
          default_response: {
            success: false,
            errors: [],
            message: "User should be provided"
          }
        })
        return;
      }

      const patient = new Patient(value);

      patient.user = user;

      const result = await patient.save();
      res.status(200).json({
        default_response: {
          success: true,
          errors: [],
          message: "Patient Added Successfully",
          data: result
        }
      })

    } catch (err) {
      logger.log("error", err || err.errors);
      console.log(err)
      res.status(409).json({
        default_response: {
          success: false,
          errors: err.errors || err,
          message: "Failed To Add Patient"
        }
      })
    }


  }
}

const updatePatient = (logger) => {
  return async function (req, res, next) {
    const {error, value} = updatePatientValidation.validate(req.body);
    if (error) {
      res.status(404).json({
        default_response: {
          success: false,
          errors: error.details,
          message: error.details[0].message
        }
      })
      return;
    }

    try {

      // const user = req.headers.user;
      const patientId = req.params.patientId;

      const patient = await Patient.findById(patientId);

      if (!patient) {
        res.status(404).json({
          default_response: {
            success: false,
            errors: [],
            message: 'Can not find Patient ID'
          }
        })
      }

      await Patient.updateOne({_id: patientId}, {$set: value});
      const updatedPatient = await Patient.findById(patientId);

      res.status(200).json({
        default_response: {
          success: true,
          errors: [],
          message: "Patient Updated Successfully",
          date: updatedPatient
        }
      })

    } catch (err) {
      logger.log('error', err.message || err.errors);

      res.status(409).json({
        default_response: {
          success: false,
          errors: err || err.errors,
          message: err.message
        }
      })
    }
  }
}

const addEMR = async (req, res) => {
  try {
    const {patientId, report, prescription, documents, doctor} = req.body;

    let patient = await Patient.findOne({user: patientId}).lean();
    if (!patient)
      return defaultResponse.failure(res, 'Patient not found.', {error: 'Patient not found.'});

    let user = await Patient.updateOne({_id: patientId}, {$push: {emr: {report, prescription, documents, doctor}}}, {new: true});

    return defaultResponse.success(res, "Successfully saved.", {user});
  } catch (e) {
    return defaultResponse.failure(res, 'Something went wrong.');
  }
}

const editEMR = async (req, res) => {
  try {
    const {patientId, emr} = req.body;

    let patient = await Patient.findOne({user: patientId}).lean();
    if (!patient)
      return defaultResponse.failure(res, 'Patient not found.', {error: 'Patient not found.'});

    let user = await Patient.updateOne({_id: patientId}, {$set: {emr}}, {new: true});

    return defaultResponse.success(res, "Successfully saved.", {user});
  } catch (e) {
    return defaultResponse.failure(res, 'Something went wrong.');
  }
}

module.exports = {
  addPatient,
  getPatientById,
  updatePatient,
  addEMR,
  editEMR,
}

