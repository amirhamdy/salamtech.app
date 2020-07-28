const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patient');
const jwtVerification = require("../middlewares/tokenUserVerfication");
const {auth} = require("../middlewares/auth");
const {isPatient} = require("../middlewares/accessControl")

module.exports = function (logger) {
  router.post('/', jwtVerification, isPatient, patientController.addPatient(logger))
  router.get('/:patientId', patientController.getPatientById(logger))
  router.put('/:patientId', jwtVerification, isPatient, patientController.updatePatient(logger))
  router.post("/emr/add", auth, patientController.addEMR);
  router.post("/emr/edit", auth, patientController.editEMR);

  return router;
};
