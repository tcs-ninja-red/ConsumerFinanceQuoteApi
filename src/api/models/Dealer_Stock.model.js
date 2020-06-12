var mongoose = require('mongoose');

var Dealer_StockSchema = mongoose.Schema(
{
    dealer_id:      {type:String},
    vehicle_code:   {type:String},
 });

module.exports = mongoose.model('Dealer_Stock', Dealer_StockSchema, 'Dealer_Stock');