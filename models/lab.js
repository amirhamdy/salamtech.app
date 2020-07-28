var mongoose = require('mongoose');
var schema = mongoose.Schema;
var labSchema = schema({
    name: { type: String, required: true, unique: true },
    arabicName: { type: String, required: true, unique: true },
    user: { type: schema.Types.ObjectId, ref: "User", required: true, unique: true },
    logo: { type: String },
    thumbnail: { type: String },
    arabicLogo: { type: String },
    arabicThumbnail: { type: String },
    phoneNumber: { type: String, required: true },
    rate: Number,
    branch: [{
        address: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
            address_name: { type: String, required: true },
            building_info: { type: Number },
            floor: { type: Number },
            apartment_number: { type: Number },
            address_line: { type: String },
            location: Object
        },
        phoneNumber: { type: String, required: true },
        workingHour: { type: Array },
        isDeliveryAvailable: { type: Boolean },
        isHomeSampleAvailable: { type: Boolean },
    }],
    address: { type: String },
    numberOfBranches: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
    isLab: { type: Boolean, required: true }

});
labSchema.index({ 'branch.address.location': '2dsphere' });


var LabSchema = mongoose.model('Lab', labSchema);
module.exports = LabSchema;