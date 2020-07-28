const _ = require('lodash');
const config = require('config');
const JWT = config.get('JWT');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const defaultResponse = require("../helper/default-response");
const {User, userSchema} = require("../models/user");
const buildHumanErrorsObject = require('../helper/humanErrorObject');

const authController = {
  register: async (req, res) => {
    const data = req.body;
    const {error} = await userSchema.validate(data, {abortEarly: false});

    const errors = error ? buildHumanErrorsObject(error.details) : {};

    if (!_.isEmpty(errors)) return defaultResponse.failure(res, "Validation Error", errors);

    let userByEmail = await User.findByEmail(data.email);
    if (!_.isEmpty(userByEmail)) errors.email = 'Email already registered.';

    let userByPhone = await User.findByPhone(data.phone);
    if (!_.isEmpty(userByPhone)) errors.phone = 'Phone already registered.';

    if (!_.isEmpty(errors)) return defaultResponse.failure(res, "Duplicated Data.", errors);

    data.email = await User.buildEmailObj(data.email);
    data.phone = await User.buildPhoneObj(data.phone);

    let user = new User(_.pick(data, ['fullName', 'email', 'password', 'phone', 'userRole']));

    user.password = await user.encryptPassword();
    user.emailVerificationCode = user.phoneVerificationCode = await user.generateVerificationCode(); // TODO: remove after SMS service implementation
    // user.phoneVerificationCode = await user.generateVerificationCode();

    await user.save();

    req.app.get('eventEmitter').emit('userRegistered', user);

    user = _.pick(user, ['_id', 'fullName', 'email', 'phone', 'userRole']);

    return defaultResponse.success(res, "Successfully registered.", {user})
  },
  login: async (req, res) => {
    const {email, password} = req.body;
    if (email && password) {
      let user = await User.findByEmail(email) || await User.findByPhone(email);
      if (user && await user.validPassword(password)) {
        user = _.pick(user, ['_id', 'fullName', 'email', 'phone', 'userRole']);
        const accessToken = jwt.sign({user}, JWT.secret);
        return defaultResponse.success(res, "Successfully logged in", {user, accessToken});
      }
    }
    return defaultResponse.failure(res, 'Invalid credentials', {'error': `Provided credentials doesn't match any user`});
  },
  profile: async (req, res) => {
    try {
      const {id: _id} = req.user;
      let user = await User.findOne({_id}).lean();
      if (!user) return defaultResponse.failure(res, 'User not found.');

      user = _.pick(user, ['_id', 'fullName', 'email', 'phone', 'userRole']);
      return defaultResponse.success(res, 'Successfully found.', {user});
    } catch (e) {
      return defaultResponse.failure(res, "Server Error.");
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const {id: _id, code} = req.params;
      let user = await User.findOne({_id}).lean();
      if (!user) return defaultResponse.failure(res, 'User not found.');

      if (user.email.verified === true) return defaultResponse.failure(res, 'Email already verified.');

      if (user.emailVerificationCode != code) return defaultResponse.failure(res, 'Invalid or Expired code provided.');

      const updatedValues = {'email.verified': true,}
      await User.findOneAndUpdate({_id}, {$set: updatedValues}, {new: true});

      return defaultResponse.success(res, "Successfully verified.");
    } catch (e) {
      return defaultResponse.failure(res, "Server Error.");
    }
  },
  verifyPhone: async (req, res) => {
    try {
      const {id: _id, code} = req.params;
      let user = await User.findOne({_id}).lean();
      if (!user) return defaultResponse.failure(res, 'User not found.');

      if (user.phone.verified === true) return defaultResponse.failure(res, 'Phone already verified.');

      if (user.phoneVerificationCode != code) return defaultResponse.failure(res, 'Invalid or Expired code provided.');

      const updatedValues = {'phone.verified': true,}
      await User.findOneAndUpdate({_id}, {$set: updatedValues}, {new: true});

      return defaultResponse.success(res, "Successfully verified.");
    } catch (e) {
      return defaultResponse.failure(res, "Server Error.");
    }
  },
  resendEmailVerificationCode: async (req, res) => {
    console.log(req.params)
    const {id: _id} = req.params;
    let user = await User.findOne({_id});

    if (!user) return defaultResponse.failure(res, 'User not fount.');

    if (user.email.verified) return defaultResponse.failure(res, 'Email already verified.');

    user = await user.updateEmailVerificationCode();

    req.app.get('eventEmitter').emit('emailVerificationCodeRequested', user);

    return defaultResponse.success(res, 'Email sent successfully.');
  },
  resendPhoneVerificationCode: async (req, res) => {
    const {id: _id} = req.params;
    let user = await User.findOne({_id});

    if (!user) return defaultResponse.failure(res, 'User not fount.');

    if (user.phone.verified) return defaultResponse.failure(res, 'Phone already verified.');

    user = await user.updatePhoneVerificationCode();

    req.app.get('eventEmitter').emit('phoneVerificationCodeRequested', user);

    return defaultResponse.success(res, 'Code sent successfully.');
  },
  updateDeviceToken: async (req, res) => {
    const {id: _id, deviceToken} = req.body;
    const updatedValues = {deviceToken}
    let user = await User.findOneAndUpdate({_id}, {$set: updatedValues}, {new: true});

    if (!user)
      return defaultResponse.failure(res, 'User not found.', {'error': `User not found.`})

    user = _.pick(user, ['_id', 'fullName', 'email', 'phone', 'userRole']);

    return defaultResponse.success(res, "Device Token Updated Successfully", {user})
  },
  // TODO: review next endpoints
  sendToForgetPassword: (req, resp) => {
    User.findOne({email: req.params.id}).then((Res) => {
      if (Res) {
        jwt.sign({user: Res}, JWT.secret, {expiresIn: 600}, (err, token) => {
          const email = Res.email;
          const userId = Res._id;
          host = req.get('host');
          link = "http://" + host + "/auth/forgetPassword/" + userId + "/" + token;
          var transporter = nodemailer.createTransport(({
            service: 'gmail',
            auth: {
              user: 'thekiller.islam@gmail.com',
              pass: '95123654'
            }
          }));

          var mailOptions;
          mailOptions = {
            from: 'help@smart-tech.com',
            to: email,
            subject: 'Forget Password',
            text: '',
            html: `<div style="border: 1px solid #cdc8c8; margin: 50px;">
                  
                    <h4 style="margin:20px 10px">Hello,</h4>
                    <p style="margin: 20px 10px"> To Change Password an account on Smart-Tech. It’s easy – just Enter to Link Below .</p>
                  
                    <div style="margin: 20px 10px">
                    <a href="${link}">${link}</a>
                    </div>
    
                    <div style="padding: 20px 10px;background: #edeff0;">
                    <p>
                    This system email was sent to (${email}) regarding your Smart-Tech Account by Smart
                    </p>
                    </div>
                    </div>
                   `
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              defaultResponse.failure(resp, error, [error])
            } else {
              console.log('Email sent: ' + info.response);
              defaultResponse.success(resp, token, "message Sending Successfully")
            }
          });

        })
      } else {
        defaultResponse.failure(resp, 'This is Email Not Found', ['This is Email Not Found'])
      }
    })
  },
  changePassword: (req, resp) => {
    var updatedValues = {password: req.body.password}
    User.updateOne({_id: req.body.userId}, {$set: updatedValues}, {upsert: true}).then((doc) => {
      defaultResponse.success(resp, "", "Update Success")
    }).catch((err) => {
      defaultResponse.failure(resp, err.message, [err.message])
    })

  }
};

module.exports = {authController};
