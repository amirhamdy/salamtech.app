var controller = require("../controllers/specialty");
var jwtVerification = require("../middlewares/tokenUserVerfication");
const express = require('express');
const router = express.Router();

function routes() {
    router.get("/", controller.getAllSpecialties);
    router.get("/en", controller.getAllSpecialtiesEnglishLanguage);
    router.get("/ar", controller.getAllSpecialtiesForArabicLanguage);
    router.get("/:id", controller.singleSpecialty);
    router.get("/en/:id", controller.singleSpecialtyEnglishLanguage);
    router.get("/ar/:id", controller.singleSpecialtyArabicLanguage);
    router.post("/", jwtVerification, controller.insertSpecialty);
    router.put("/", jwtVerification, controller.updateSpecialty);
    router.delete("/:id", jwtVerification, controller.deleteSpecialty);
    return router
}

module.exports = routes;
