const {authController} = require("../controllers/auth");
const jwtForgetPassword = require("../middlewares/forget-password-verfication");
const express = require('express');
const router = express.Router();

function routes() {
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/me", authController.profile);
  router.get("/verify/email/resend/:id", authController.resendEmailVerificationCode);
  router.get("/verify/email/:id/:code", authController.verifyEmail);
  router.get("/verify/phone/resend/:id", authController.resendPhoneVerificationCode);
  router.get("/verify/phone/:id/:code", authController.verifyPhone);
  router.post("/updateDeviceToken", authController.updateDeviceToken);
  // TODO: waiting for the reset password flow
  router.get("/forgetPassword/:id", authController.sendToForgetPassword);
  router.post("/changePassword", jwtForgetPassword, authController.changePassword);
  return router;
}

module.exports = routes;
