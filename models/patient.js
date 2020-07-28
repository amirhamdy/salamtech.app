const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {type: String, required: true},
  profilePic: {type: String},
  dob: {type: Date, required: true},
  gender: {type: String},
  rate: {type: Number},
  address: {
    long: {type: Number, required: true},
    lat: {type: Number, required: true},
    addressName: {type: String, required: true},
    buildingInfo: {type: String},
    floor: {type: Number},
    apartmentNumber: {type: Number},
    addressLine: {type: String}
  },
  insuranceCard: {type: String},
  height: {type: Number},
  weight: {type: Number},
  bloodPressure: {
    upper: {type: Number},
    lower: {type: Number}
  },
  sugarLevel: {type: Number},
  bloodType: {type: String},
  allergies: {type: Array},
  prescriptions: {type: Array},
  familyMembers: [{
    relationship: {type: String, required: true},
    fullName: {type: String, require: true},
    phone: {type: String}
  }],
  points: {type: Number},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  emr: [{
    report: {
      type: String,
    },
    prescription: [{
      name: {
        type: String,
      },
      description: {
        type: String,
      },
    }],
    documents: {type: Array},
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  }],
}, {timestamps: true});

const Patient = mongoose.model('Patient', schema);

module.exports = {Patient};
