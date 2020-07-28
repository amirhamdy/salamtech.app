const express = require('express');
const router = express.Router();
const {auth} = require("../middlewares/auth");

const appointmentController = require('../controllers/appointment');
const jwtVerification = require("../middlewares/tokenUserVerfication");
const {isPatient} = require("../middlewares/accessControl")


module.exports = function () {
  router.get('/:id', appointmentController.getById)
  router.post('/new', appointmentController.newAppointment)
  router.post('/edit/:id/', appointmentController.editAppointment)
  router.get('/patient/:page?', auth, appointmentController.getPatientAppointments)
  router.get('/doctor/:page?', auth, appointmentController.getDoctorAppointments)

  return router;
};
