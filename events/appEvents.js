const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const sendMail = require('../services/emailService');
const {hashSync} = require("bcrypt");

module.exports = function (app) {
  eventEmitter.on('userRegistered', async (user) => {
    //TODO: add email templates.
    const body = `Hello ${user.fullName},\n\n Your email verification code is: ${user.emailVerificationCode}`;
    await sendMail(user.email.address, 'Email Verification Code', body);

    //TODO: send SMS with phone verification code.
  });

  eventEmitter.on('emailVerificationCodeRequested', async (user) => {
    //TODO: add email templates.
    const body = `Hello ${user.fullName},\n\n Your email verification code is: ${user.emailVerificationCode}`;
    await sendMail(user.email.address, 'Email Verification Code', body);
  });

  eventEmitter.on('phoneVerificationCodeRequested', async (user) => {
    //TODO: send SMS with phone verification code.

  });

  app.set('eventEmitter', eventEmitter);
};
