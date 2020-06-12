const mongoose = require('mongoose');

var pricingSchema = mongoose.Schema(
    {
        vehicle_code:       { type: String },
        registered_month:   { type: Number },
        registered_year:    { type: Number },
        term:               { type: Number },
        future_price:       { type: Number }
    }
);

module.exports = mongoose.model("Pricing", pricingSchema, "Vehicle_Pricing");