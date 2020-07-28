const jwtVerification = require("../middlewares/tokenUserVerfication");
const {auth} = require("../middlewares/auth");
const express = require('express');
const router = express.Router();

const doctorController = require("../controllers/doctor");

function routes() {
  router.get("/count", doctorController.getCountOfDoctor)
  router.get("/", doctorController.getDoctors);
  router.get("/top", doctorController.getTopDoctors);
  router.get("/:id", doctorController.getSingleDoctor);
  router.get("/profile/:id", doctorController.getSingleDoctorForUserId);
  router.post("/", auth, doctorController.insertDoctor);
  router.put("/", auth, doctorController.updateDoctor);
  router.delete("/:id", auth, doctorController.deleteDoctor);
  return router;
}

module.exports = routes;
