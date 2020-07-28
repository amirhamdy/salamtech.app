const prefix = `/api/v1`;
const logger = require('../logger');

const clinicRoutes = require('./clinic');
const patientRoutes = require('./patient');
const doctorRoutes = require('./doctor');
const appointmentRoutes = require('./appointment');

const auth = require("./auth");
const specialty = require("./specialty");
const rate = require("./rateDoctor");
const uploadImage = require("./upload");
const lab = require("./lab");

module.exports = function (app) {
  app.use(`${prefix}/upload`, uploadImage());
  app.use(`${prefix}/auth`, auth());
  app.use(`${prefix}/specialty`, specialty());
  app.use(`${prefix}/clinic`, clinicRoutes(logger));
  app.use(`${prefix}/patient`, patientRoutes(logger));
  app.use(`${prefix}/rate`, rate());
  app.use(`${prefix}/doctor`, doctorRoutes());
  app.use(`${prefix}/lab-pharmacy`, lab());
  app.use(`${prefix}/appointment`, appointmentRoutes());
}
