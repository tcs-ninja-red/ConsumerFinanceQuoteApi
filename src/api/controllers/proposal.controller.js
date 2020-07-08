const httpStatus = require('http-status');
const quoteModel = require('../models/quote.model');
const pricingCollection = require('../models/pricing.model');
const planCollection = require('../models/plan.model');
const Proposal = require('../models/proposal.model');
const mongoose = require('mongoose');

exports.createProposal = async (req, res, next) => { 
    try {
        console.log('we are on proposal controller - api/v1/proposals api');
        
        let chunk = req.body;
        let headers = req.headers;

        console.log('Request Headers: ', headers);
        console.log('Request Json Data: ', chunk);

        const proposal = new Proposal({
            _id: new mongoose.Types.ObjectId(),
            dealer_id: headers['dealer_id'],
            decision: "ACCEPTED",
            customer: {
                first_name: chunk.customer.first_name,
                surname: chunk.customer.surname,
                date_of_birth: chunk.customer.date_of_birth,
                email: chunk.customer.email,
                address: {
                    address1: chunk.customer.address.address1,
                    address2: chunk.customer.address.address2,
                    address3: chunk.customer.address.address3,
                    postcode: chunk.customer.address.postcode,
                    town: chunk.customer.address.town,
                    city: chunk.customer.address.city
                }
            },
            financial: {
                product: chunk.financial.product,
                cash_price:chunk.financial.cash_price,
                term:chunk.financial.term,
                deposit_amount: chunk.financial.deposit_amount,
                max_annual_mileage: chunk.max_annual_mileage
            },
            vehicle: {
                vehicle_code: chunk.vehicle.vehicle_code,
                vehicle_mileage: chunk.vehicle.vehicle_mileage,
                registration_month: chunk.vehicle.registration_month,
                registration_year: chunk.vehicle.registration_year,
                make: chunk.vehicle.make,
                model:  chunk.vehicle.model,
                description:  chunk.vehicle.description,
                model_year:  chunk.vehicle.model_year
            },
            max_annual_mileage: chunk.max_annual_mileage,
            excess_mileage: chunk.excess_mileage,
            first_payment_amount: chunk.first_payment_amount,
            monthly_payment_amount: chunk.monthly_payment_amount,
            final_payment_amount: chunk.final_payment_amount,
            amount_of_credit: chunk.amount_of_credit,
            total_charge_for_credit: chunk.total_charge_for_credit,
            fixed_rate_interest: chunk.apr,
            apr: chunk.apr,
            total_amount_payable: chunk.total_amount_payable
        });

        //Proposal request validation
        let validateError = proposal.validateSync();

        if (validateError) {
            if (validateError.name === 'ValidationError') {
                return this.handleValidationError(validateError, res);
            }
        }

        proposal.save().then(result => {
            //console.log(result);
            res.status(httpStatus.CREATED).json({
                message: "Proposal Created Successfully",
                decision: {
                    proposal_ref_number: result._id,
                    message: result.decision,
                    request: [
                        {
                            type: "GET",
                            description: "Get proposal for the given proposal Id",
                            url: "http://localhost:44301/api/v1/proposals/" + result._id
                        },
                        {
                            type: "GET",
                            description: "Get all proposals associated with the dealer",
                            url: "http://localhost:44301/api/v1/proposals/"
                        }
                    ]
                }
            });
        }).catch(err => {
            console.log(err.message);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                messages: ["Something went wrong!! \n" + err.message],
                status_code: httpStatus.INTERNAL_SERVER_ERROR
            });
        });
    }
    catch (er) {
        next(er);
    }
};

exports.handleValidationError = (err, res) => {
    console.log('You are in handleValidateError method');
    const messages = [];
    for (let field in err.errors) {
        messages.push(err.errors[field].message);
        console.log(err.errors[field].message);
    }
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        status_code: httpStatus.UNPROCESSABLE_ENTITY,
        messages: messages
    });
};