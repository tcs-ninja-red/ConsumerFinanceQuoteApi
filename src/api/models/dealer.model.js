var mongoose = require('mongoose');

var dealerSchema = mongoose.Schema(
    {
        dealer_id: { type: String },
        dealer_name: { type: String },
        address1: { type: String },
        address2: { type: String },
        address3: { type: String },
        postcode: { type: String },
        town: { type: String },
        city: { type: String },
        dealer_apr:{type: Number}
    }); 

module.exports = mongoose.model('Dealer', dealerSchema, 'Dealer');