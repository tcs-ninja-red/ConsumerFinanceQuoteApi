const mongoose = require('mongoose');

var pricingSchema = mongoose.Schema(
    {
        dealer_id:          { type: String },
        plan_id:            { type: String },
        minimum_deposit:    { type: Number },
        apr:                { type: Number }
    }
);

module.exports = mongoose.model("Plans", pricingSchema, "Dealer_Plan");