const mongoose = require("mongoose");

var proposalSchema = mongoose.Schema(
    {
        financial: {
            product: { type: String},
            cash_price: {type: Number},
            deposit_amount: {type: Number},
            term: {type: Number}
        },
        vehicle: {
            vehicle_code: { type: String },
            vehicle_mileage: {type: Number},
            registration_month: {type: Number},
            registration_year: {type: Number},
            make: {type: String},
            model: {type: String},
            description: {type: String},
            model_year: {type: Number}
        },
        max_annual_mileage: { type: Number },
        excess_mileage: { type: Number },
        max_annual_mileage: { type: Number },
        first_payment_amount: { type: Number },
        monthly_payment_amount: { type: Number },
        final_payment_amount: { type: Number },
        amount_of_credit: { type: Number },
        total_charge_for_credit: { type: Number },
        fixed_rate_interest: { type: Number },
        apr: { type: Number },
        total_amount_payable: { type: Number },
        dealer_id: { type: String },
        created_datetime: { type: Date, default: Date.now },
        decision: {type: String},
        customer: {
            first_name: { type: String },
            surname: {type: String},
            date_of_birth: { type: String },
            email: {type: String},
            address: {
                address1: { type: String },
                address2: {type: String},
                address3: {type: String},
                postcode0: {type: String},
                town: {type: String},
                city: {type: String}
            }
        }      
    }   
);

module.exports = mongoose.model("Proposal", proposalSchema, "Proposal");