const httpStatus = require('http-status');
const quoteModel = require('../models/quote.model');
const pricingCollection = require('../models/pricing.model');

// Genarate Quote based on given finance and vehicle data
exports.generateQuote = async (req, res, next) => {
    try {
        console.log('we are on quotes controller - api/v1/quotes api');

        let chunk = req.body;
        console.log('Request Json Data: ', chunk);

        let isValid = true;

        if (chunk === null) {
            isValid = false;
        }
        else if (chunk.financial.product === undefined || (chunk.financial.product != 'HP' && chunk.financial.product != 'PCP')) {
            isValid = false;
        }
        console.log("Is Valid Quote ?", isValid);


        if (isValid === false) {
            console.log("Validation failed!!! Exit Quote process.");
            res.status(httpStatus.BAD_REQUEST).json({
                message: "Invalid request",
                status_code: httpStatus.BAD_REQUEST
            });
            return;
        }

        console.log("Validation success!!! Continue Quote process.");

        let product = chunk.financial.product;

        if (product === 'HP')
        {
            console.log("HP Product, So No Pricing details");
            response = this.calculateQuote(chunk, 0).then(response => {
                console.log("Response json:", response);
                res.status(httpStatus.OK).json(response);
            });
        }
        else if (product === 'PCP')
        {
            console.log("PCP Product, So calling Pricing details");
            //Validate GFV Pricing available for the vehicle and return error of not found
            this.getPricing(chunk).then((result) => {
                //console.log("Get Pricing data: ", result[0]);
                response = this.calculateQuote(chunk, result[0].future_price).then(response => {
                    console.log("Response json:", response);
                    res.status(httpStatus.OK).json(response);
                });
            }).catch((err) => {
                if (err == httpStatus.NOT_FOUND) {
                    res.status(httpStatus.NOT_FOUND).json({
                        message: "Pricing Not avaialable for the given vehicle combinations",
                        status_code: httpStatus.NOT_FOUND
                    });
                }
                else {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                        message: "Something went wrong.",
                        status_code: httpStatus.INTERNAL_SERVER_ERROR
                    });
                }
            });
        }
    } catch (er) {
        next(er);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: er,
            status_code: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
};

exports.getPricing = async (req) => {
    console.log("We are on getPricing module");
    return new Promise((resolve, reject) => {
        pricingCollection.find({
            "vehicle_code": req.vehicle.vehicle_code,
            "registered_month": req.vehicle.registration_month,
            "registered_year": req.vehicle.registration_year,
            "term": req.financial.term
        }).then(doc => {
            //console.log("From database: ", doc);
            if (doc.length > 0) {
                resolve(doc);
            } else {
                reject(httpStatus.NOT_FOUND);
            }
        }).catch(err => {
            reject(httpStatus.INTERNAL_SERVER_ERROR);
        });
    });
};

exports.calculateQuote = async (chunk, price) => {
    console.log("We are on calculateQuote module");

    let response = quoteModel.Quote;

    let excess_mileage = 0;
    let rate = 10;
    let first_payment_amount = 0;
    let final_payment_amount = 0;
    let monthly_payment_amount = 0;

    let product = chunk.financial.product;
    let deposit_amount = chunk.financial.deposit_amount;
    let cash_price = chunk.financial.cash_price;
    let term = chunk.financial.term;
    
    let amount_of_credit = cash_price - deposit_amount;
    let total_charge_for_credit = ((amount_of_credit * rate * term) / (12 * 100));
    let total_amount_payable = amount_of_credit + total_charge_for_credit;

    if (product === 'HP') {
        first_payment_amount = (total_amount_payable / term);
        final_payment_amount = first_payment_amount;
        monthly_payment_amount = first_payment_amount;
    }
    else if (product === 'PCP') {
        let pricingPerc = price;
    
        if (pricingPerc === undefined) {
            pricingPerc = 50;
        }

        let pricing = (cash_price * pricingPerc) / 100;
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
    response.amount_of_credit = parseFloat(amount_of_credit.toFixed(2));
    response.total_charge_for_credit = parseFloat(total_charge_for_credit.toFixed(2));
    response.fixed_rate_interest = rate;
    response.apr = rate;
    response.total_amount_payable = parseFloat(total_amount_payable.toFixed(2));

    return response;
};

// exports.isValidQuote = async (chunk) => {
//     console.log("We are on IsValidQuote module");
//     let isValid = "T";

//     if (chunk === null) {
//         isValid = "F";
//     }
//     else if (chunk.financial.product === undefined || (chunk.financial.product != 'HP' && chunk.financial.product != 'PCP')) {
//         isValid = "F";
//     }
//     console.log("Is Valid Quote ?", isValid);
//     return isValid;
// }
