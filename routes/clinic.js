const express = require('express');
const router = express.Router();

const clinicController = require('../controllers/clinic');
const jwtVerification = require("../middlewares/tokenUserVerfication");
const {isClinic} = require("../middlewares/accessControl")


module.exports = function (logger) {
  router.get('/', clinicController.index)
  router.post('/', jwtVerification, isClinic, clinicController.AddClinic(logger))
  router.get('/:clinicId', clinicController.getClinicById(logger))
  router.put('/:clinicId', jwtVerification, isClinic, clinicController.updateClinic(logger))

  return router;
};
