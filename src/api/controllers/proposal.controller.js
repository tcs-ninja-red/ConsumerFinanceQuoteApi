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
            dealer_id: chunk.dealer_id,
            decision: {
                decision_status: null,
                decision_message: null
            },
            customer: {
                title: chunk.customer.title,
                fore_name: chunk.customer.fore_name,
                middle_name: chunk.customer.middle_name,
                surname: chunk.customer.surname,
                date_of_birth: chunk.customer.date_of_birth,
                email: chunk.customer.email,
                phone: chunk.customer.phone,
                gender: chunk.customer.gender,
                marital_status: chunk.customer.marital_status,
                country_of_origin: chunk.customer.country_of_origin,
                address: {
                    address1: chunk.customer.address.address1,
                    address2: chunk.customer.address.address2,
                    address3: chunk.customer.address.address3,
                    postcode: chunk.customer.address.postcode,
                    town: chunk.customer.address.town,
                    city: chunk.customer.address.city,
                    time_at_address: chunk.customer.address.time_at_address
                },
                employment: {
                    occupation: chunk.customer.employment.occupation,
                    years_at_employment: chunk.customer.employment.years_at_employment,
                    months_at_employment: chunk.customer.employment.months_at_employment,
                    gross_annual_salary: chunk.customer.employment.gross_annual_salary
                },
                bank_account: {
                    account_name: chunk.customer.bank_account.account_name,
                    account_number: chunk.customer.bank_account.account_number,
                    sort_code: chunk.customer.bank_account.sort_code
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

        //Decision Rule
        //Rejected: if customer age is less than 16
        //Rejected: if monthly payment is greater than employment monthly salary
        //Referred : if time at address is less than 36 months

        var birthdate = proposal.customer.date_of_birth;
        var cur = new Date();
        var diff = cur-birthdate; // This is the difference in milliseconds
        var age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // Divide by 1000*60*60*24*365.25
        
        console.log('Age: ' + age);
        console.log('Monthly salary: ' + proposal.customer.employment.gross_annual_salary / 12);

        if (proposal.customer.address.time_at_address < 36) {
            proposal.decision.decision_status = "REFERRED";
            proposal.decision.decision_message = "Proposal has been Referred due to given time at address is lesser than minimum time at address allowed.";
        }
        else if (age < 16) {
            proposal.decision.decision_status = "REJECTED";
            proposal.decision.decision_message = "Proposal has been Rejected due to given customer's age is lesser than minimum age allowed.";
        }
        else if (proposal.customer.employment.gross_annual_salary / 12 <= proposal.monthly_payment_amount) {
            proposal.decision.decision_status = "REJECTED";
            proposal.decision.decision_message = "Proposal has been rejected due to given customer's monthly salary is lesser than monthly payment amount allowed.";
        }
        else {
            proposal.decision.decision_status = "ACCEPTED";
            proposal.decision.decision_message = "Proposal has been accepted.";
        }

        proposal.save().then(result => {
            //console.log(result);
            res.status(httpStatus.CREATED).json({
                proposal_ref_number: result._id,
                decision: result.decision,
                request: [
                    {
                        type: "GET",
                        description: "Get proposal for the given proposal Id",
                        url: req.protocol + "://" + req.headers.host  +  req.originalUrl + "/" + result._id
                    },
                    {
                        type: "GET",
                        description: "Get all proposals associated with the dealer",
                        url: req.protocol + "://" + req.headers.host  +  req.originalUrl
                    }
                ]
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