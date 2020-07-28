var mongoose = require('mongoose');
var schema = mongoose.Schema;
var rateSchema = schema({
    user: {type: schema.Types.ObjectId, ref: "User", required: true },
    receiver: {type: schema.Types.ObjectId, ref: "User", required: true },
    rate: {type: Number, required: true},
    rateFor: {type: String, required: true},
    created_at: Date,
    updated_at: Date
});
var RateSchema = mongoose.model('rate', rateSchema);
module.exports = RateSchema;