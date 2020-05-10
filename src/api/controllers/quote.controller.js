const express = require('express')
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const quoteresp = require('../models/quote.model');


exports.calculateQuote = async (req, res, next) => {

 try {

    console.log('we are on quote - api/v1/quote api');

    const app = express();
    app.use(express.json());    // <==== parse request body as JSON
    var chunk = req.body;
    
    var rate = 10;
    var vehicle_mileage = chunk.vehicle.vehicle_mileage;
    var registration_month = chunk.vehicle.registration_month;
    var registration_year = chunk.vehicle.registration_year;
    var make = chunk.vehicle.make;
    var model = chunk.vehicle.model;
    var description = chunk.vehicle.description;
    var model_year = chunk.vehicle.model_year;
    var excess_mileage = chunk.vehicle.excess_mileage;
    

 
    var product = chunk.financial.product;
    var cash_deposit = chunk.financial.deposits.cash_deposit;
    var cheque_deposit = chunk.financial.deposits.cheque_deposit;
    var card_deposit = chunk.financial.deposits.card_deposit;
    var total_deposit = chunk.financial.deposits.total_deposit;
    var cash_price = chunk.financial.cash_price;
    var pricing = (cash_price * 50 ) / 100;
    var max_annual_mileage = chunk.financial.max_annual_mileage;
    var term = chunk.financial.term;
    
    var amount_of_credit = cash_price - cash_deposit;
    var total_charge_for_credit = ((amount_of_credit * rate * term) / (12*100));
    var fixed_rate_interest = rate;
    var apr = rate;
    var total_amount_payable = amount_of_credit + total_charge_for_credit;
    var first_payment_amount = total_amount_payable / term;
    var final_payment_amount = first_payment_amount;
    var monthly_payment_amount = first_payment_amount;
    var first_payment_amount_pcp = ((total_amount_payable - pricing) / (term - 1));
    var final_payment_amount_pcp = pricing;
    var monthly_payment_amount_pcp = first_payment_amount_pcp;


    res.status(httpStatus.OK).json( {
        financials: {
        product ,
        cash_price ,
        deposits: {
        cash_deposit ,
        cheque_deposit ,
        card_deposit ,
        total_deposit
        },
        term 
        },

        vehicle: {
         vehicle_mileage,
         registration_month,
         registration_year,
         make,
         model,
         description,
         model_year,
         excess_mileage
        },
        max_annual_mileage,
        first_payment_amount,
         monthly_payment_amount,
         final_payment_amount,
         first_payment_amount_pcp,
         monthly_payment_amount_pcp,
         final_payment_amount_pcp,
         pricing,
         amount_of_credit,
         total_charge_for_credit,
         fixed_rate_interest,
         apr,
         total_amount_payable
    }    
    );

 } catch (er)
  {
    next(er);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: er,
        status_code: httpStatus.INTERNAL_SERVER_ERROR
    });
}
};
