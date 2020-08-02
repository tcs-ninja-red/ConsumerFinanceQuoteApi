var mongoose = require('mongoose');

var vehicleSchema = mongoose.Schema(
{
    vehicle_code:       { type: String },
    make_name:          { type: String },
    model_name:         { type: String },
    description:        { type: String },
    cash_price:         { type: Number },
    color:              [{ type: String }],
    transmission:       { type: String },
    fuel_type:          { type: String },
    body_style:         { type: String },
    model_year:         { type: Number },
    vehicle_mileage:    { type: Number },
    registration_month: { type: Number },
    registration_year:  { type: Number }
 });

module.exports = mongoose.model('Vehicle', vehicleSchema, 'Vehicle');