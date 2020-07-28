const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const specialtySchema = Schema({
    specialtyName: { type: String, required: true, unique: true },
    specialtyDescription: { type: String },
    image: { type: String },
    specialtyNameArabic: { type: String, unique: true },
    specialtyDescriptionArabic: { type: String },
    imageArabic: { type: String},
}, { timestamps: true });
const SpecialtySchema = mongoose.model('Specialty', specialtySchema);
module.exports = SpecialtySchema;