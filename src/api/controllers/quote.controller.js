const httpStatus = require('http-status');
const quoteModel = require('../models/quote.model');

// Genarate Quote based on given finance and vehicle data
exports.generateQuote = async (req, res, next) => {
    try {
        console.log('we are on quotes controller - api/v1/quotes api');

        let chunk = req.body;
        let response = quoteModel.Quote;
        
        console.log('Request Json Data: ');
        console.log(chunk);

        //Request data
        let excess_mileage = 0;
        let rate = 10;
        let first_payment_amount = 0;
        let final_payment_amount = 0;
        let monthly_payment_amount = 0;

        let product = chunk.financial.product;
        let deposit_amount = chunk.financial.deposit_amount;
        let cash_price = chunk.financial.cash_price;
        let term = chunk.financial.term;   
        let pricing = (cash_price * 50 ) / 100;
        let amount_of_credit = cash_price - deposit_amount;
        let total_charge_for_credit = ((amount_of_credit * rate * term) / (12*100));
        let total_amount_payable = amount_of_credit + total_charge_for_credit;

        if (product === 'HP')
        {
            first_payment_amount = (total_amount_payable / term);
            final_payment_amount = first_payment_amount;
            monthly_payment_amount = first_payment_amount;
        }
        else if (product === 'PCP')
        {
            first_payment_amount = ((total_amount_payable - pricing) / (term - 1));
            final_payment_amount = pricing;
            monthly_payment_amount = first_payment_amount;
        }

        // Response Json preparation
        response.financial.product = chunk.financial.product;
        response.financial.cash_price = chunk.financial.cash_price;
        response.financial.term = chunk.financial.term;
        response.financial.deposit_amount = chunk.financial.deposit_amount;
        response.max_annual_mileage = chunk.max_annual_mileage;
        response.vehicle.vehicle_mileage = chunk.vehicle.vehicle_mileage;
        response.vehicle.registration_month = chunk.vehicle.registration_month;
        response.vehicle.registration_year = chunk.vehicle.registration_year;
        response.vehicle.make = chunk.vehicle.make;
        response.vehicle.model = chunk.vehicle.model;
        response.vehicle.description = chunk.vehicle.description;
        response.vehicle.model_year = chunk.vehicle.model_year;
        
        //Calculated Response
        response.excess_mileage = parseFloat(excess_mileage.toFixed(2));
        response.first_payment_amount = parseFloat(first_payment_amount.toFixed(2));
        response.monthly_payment_amount = parseFloat(monthly_payment_amount.toFixed(2));
        response.final_payment_amount = parseFloat(final_payment_amount.toFixed(2));
        response.pricing = parseFloat(pricing.toFixed(2));
        response.amount_of_credit = parseFloat(amount_of_credit.toFixed(2));
        response.total_charge_for_credit = parseFloat(total_charge_for_credit.toFixed(2));
        response.fixed_rate_interest = rate;
        response.apr = rate;
        response.total_amount_payable = parseFloat(total_amount_payable.toFixed(2));
       
        console.log('Response Json Data: ');
        console.log(response);

        res.status(httpStatus.OK).json(response);
    } catch (er) {
        next(er);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: er,
            status_code: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
};
