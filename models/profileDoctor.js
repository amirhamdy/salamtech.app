var mongoose = require('mongoose');
var schema = mongoose.Schema;
var doctorProfileSchema = schema({
    user: {type: schema.Types.ObjectId, ref: "User", required: true, unique: true },
    logo: {type: String},
    thumbnail: {type: String},
    phoneNumber: {type: String, required: true},
    rate: Number,
    workingHour: {type: Array, required: true},
    address: {type: Object, required: true},
    dob: {type: Date, required: true},
    gender: {type: String, required: true},
    levelOfSeniority: {type: String, required: true},
    specializations: [{type: schema.Types.ObjectId, ref: "Specialty", required: true}],

    fess: {type: Number, required: true},
    eductionCertificate: {type: String, required: true},
    documents: {type: Array, required: true},
    subSpecializations: {type: String, required: true},

    // will send working hours-days-timeSlot-bookedAppointments

});
var DoctorProfileSchema = mongoose.model('Doctor', doctorProfileSchema);
module.exports = DoctorProfileSchema;
