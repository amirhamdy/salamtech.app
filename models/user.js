const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const {roles} = require('../globals');

const schema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: {
    address: {
      type: String,
      unique: true,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },
  phone: {
    number: {
      type: String,
      unique: true,
      validate: {
        validator: function isValidPhoneNumber(v) {
          return /^01[0-2|5]{1}[0-9]{8}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number.`,
      },
      required: [true, 'phone number is required.'],
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  userRole: {
    type: String,
    required: true,
    enum: [...Object.values(roles)],
  },
  accessToken: String,
  deviceToken: String,
  isActive: {type: Boolean, require: true, default: false},
  emailVerificationCode: {type: Number, require: true},
  phoneVerificationCode: {type: Number, require: true},
}, {timestamps: true});

schema.statics.findByEmail = async function (email) {
  return this.findOne({'email.address': email});
}

schema.statics.findByPhone = async function (phone) {
  return this.findOne({'phone.number': phone});
}

schema.statics.buildEmailObj = async function (email) {
  return {address: email, verified: false};
};

schema.statics.buildPhoneObj = async function (phone) {
  return {number: phone, verified: false};
};

schema.methods.encryptPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(this.password.toString(), salt);
};

schema.methods.generateVerificationCode = async function () {
  return Math.floor(1000 + Math.random() * 9000);
};

schema.methods.validPassword = async function (password) {
  return bcrypt.compare(password.toString(), this.password);
};

schema.methods.updateEmailVerificationCode = async function () {
  const emailVerificationCode = await this.generateVerificationCode();
  return User.findOneAndUpdate({_id: this._id}, {$set: {emailVerificationCode}}, {new: true, upsert: true});
}

schema.methods.updatePhoneVerificationCode = async function () {
  const phoneVerificationCode = await this.generateVerificationCode();
  return User.findOneAndUpdate({_id: this._id}, {$set: {phoneVerificationCode}}, {new: true, upsert: true});
}

const User = mongoose.model('User', schema);

const userSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required().label('Full Name'),
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().min(8).max(1024).required().label('Password'),
  phone: Joi.string().pattern(/^01[0-2|5]{1}[0-9]{8}$/).required().label('Phone').messages({'string.pattern.base': 'Invalid phone number provided.'}),
  userRole: Joi.string().valid(...Object.values(roles)).required().label('User Role').messages({'any.only': 'Invalid user role provided.'}),
});

module.exports = {User, userSchema};
