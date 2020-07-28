const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {type: String, required: true},
  specialisations: [{type: mongoose.Schema.Types.ObjectId, ref: "Specialty"}],
  logo: {type: String},
  thumbnail: {type: String},
  rate: {type: Number},
  operatingHours: {start: String, end: String},
  operatingDays: [{day: String}],
  address: {
    long: {type: Number, required: true},
    lat: {type: Number, required: true},
    addressName: {type: String, required: true},
    buildingInfo: {type: String},
    floor: {type: Number},
    apartmentNumber: {type: Number},
    addressLine: {type: String}
  },
  services: [{
    name: {type: String},
    price: {type: Number}
  }],
  amenities: [{
    name: String
  }],
  gallery: [{
    image: String
  }],
  registrationCertificate: {type: String},
  website: {type: String},
  doctors: [{type: mongoose.Schema.Types.ObjectId, ref: "Doctor"}],
  isActive: {type: Boolean},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {timestamps: true})

const Clinic = mongoose.model('Clinic', schema);

module.exports = {Clinic};
