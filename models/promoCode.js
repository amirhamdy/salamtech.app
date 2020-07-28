const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promoCodeSchema = new Schema({
    code: { type: String, required: true},
    name: { type: String, required: true},
    description: { type: String },
    currentUses: { type: Number },
    maxUses: { type: Number},
    maxUsesPerUser: {type: Number},
    discountAmount: {type: Number}, // Could be Precentage Or Value in Currency
    isFixed: { type: Boolean},
    maxDiscount: { type: Number },
    currency: {type: String}, 
    appliesTo: [],
    allowedPaymentMethods: [],
    startAt: {type: Date },
    endAt: {type: Date },
}, { timestamps: true })


module.exports = mongoose.model('PromoCode', promoCodeSchema);