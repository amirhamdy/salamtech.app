const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
  patient: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  clinic: {type: mongoose.Schema.Types.ObjectId, ref: 'Clinic'},
  // appointment time-date
  promoCode: {type: mongoose.Schema.Types.ObjectId, ref: 'PromoCode'},
  grandTotal: {type: Number},
  discount: {type: Number},
  total: {type: Number},
  paymentMethod: {type: String},
  isActive: {type: Boolean, require: true, default: false},
}, {timestamps: true});

const Appointment = mongoose.model('Appointment', schema);

const appointmentSchema = Joi.object({});

module.exports = {Appointment, appointmentSchema};
