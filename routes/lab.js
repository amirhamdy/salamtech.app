var controller = require("../controllers/lab");
var jwtVerification = require("../middlewares/tokenUserVerfication");
const express = require('express');
const router = express.Router();
function routes() {
    router.get("/count", controller.count)
    router.get("/", controller.getLabsAndPharmacies);
    router.get("/:id", controller.getSingleLabOrPharmacy);
    router.get("/profile/:id", controller.getSingleLabOrPharmacyForUserId);
    router.post("/", controller.insertLabOrPharmacy);
    router.put("/", controller.updateLabOrPharmacy);
    router.delete("/:id", controller.deleteLabOrPharmacy);
    return router;
}

module.exports = routes;
