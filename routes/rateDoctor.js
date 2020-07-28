var controller = require("../controllers/rateDoctor");
var jwtVerification = require("../middlewares/tokenUserVerfication");
const express = require('express');
const router = express.Router();

function routes() {
    router.get("/", controller.getAllRates);
    router.get("/profile/:id", controller.singleRateForReceiver);
    router.get("/user/:id", controller.singleRateForUser);
    router.post("/", jwtVerification, controller.insertRate);
    return router;
}

module.exports = routes;
