const _ = require('lodash');
const {Appointment, appointmentSchema} = require('../models/appointment');
const {Clinic} = require('../models/clinic');
const buildHumanErrorsObject = require('../helper/humanErrorObject');
const defaultResponse = require("../helper/default-response");

const getPatientAppointments = async (req, res) => {
  try {
    const perPage = 10;
    let {page} = req.query;
    page = page || 1;
    const patient = req.user._id;

    const appointments = await Appointment.find({patient})
      .populate('doctor', 'fullName').populate('clinic')
      .skip((page - 1) * perPage).limit(perPage).sort({createdAt: -1});

    return defaultResponse.success(res, "Successfully Fetched.", {appointments, page, perPage});
  } catch (e) {

    return defaultResponse.failure(res, "Error while fetching appointments.");
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const perPage = 10;
    let {page} = req.query;
    page = page || 1;
    const doctor = req.user._id;

    const appointments = await Appointment.find({doctor})
      .populate('patient', 'fullName').populate('clinic')
      .skip((page - 1) * perPage).limit(perPage).sort({createdAt: -1});

    return defaultResponse.success(res, "Successfully Fetched.", {appointments, page, perPage});
  } catch (e) {

    return defaultResponse.failure(res, "Error while fetching appointments.");
  }
};

const getById = async (req, res) => {
  try {
    let {id: _id} = req.query;

    const appointment = await Appointment.find({_id}).populate('doctor', 'fullName').populate('patient', 'fullName').populate('clinic');

    if (_.isEmpty(appointment))
      return defaultResponse.failure(res, "Appointment not found.");

    return defaultResponse.success(res, "Successfully Fetched.", {appointment});
  } catch (e) {

    return defaultResponse.failure(res, "Error while fetching appointment.");
  }
};

const newAppointment = async (req, res) => {
  try {
    const user = req.headers.user;
    const data = req.body;

    //TODO: Add Joi Validation
    /*
        const {error} = await appointmentSchema.validate(data, {abortEarly: false});

        const errors = error ? buildHumanErrorsObject(error.details) : {};

        if (!_.isEmpty(errors)) return defaultResponse.failure(res, "Validation Error", errors);
    */

    const appointment = new Appointment(_.pick(data, ['patient', 'doctor', 'clinic', 'grandTotal', 'discount', 'total', 'paymentMethod', 'isActive']));

    await appointment.save();

    return defaultResponse.success(res, "Successfully Added.", {appointment});
  } catch (e) {

    return defaultResponse.failure(res, "Failed To Add Appointment.");
  }
};

const editAppointment = async (req, res) => {
  try {
    const {id: _id} = req.params;
    const updatedValues = req.body;

    const appointment = await Appointment.findOneAndUpdate({_id}, {$set: updatedValues}, {new: true});

    if (!appointment)
      return defaultResponse.failure(res, 'Appointment not found.', {'error': `Appointment not found.`})

    return defaultResponse.success(res, "Appointment Updated Successfully", {appointment})
  } catch (e) {

    return defaultResponse.failure(res, "Failed To Update Appointment.");
  }
};

module.exports = {
  getById,
  getPatientAppointments,
  getDoctorAppointments,
  newAppointment,
  editAppointment,
}

