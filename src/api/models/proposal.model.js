const mongoose = require("mongoose");
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid';

var proposalSchema = mongoose.Schema(
    {
        financial: {
            product: {
                type: String,
                required: true,
                enum: {
                    values: ['HP', 'PCP'],
                    message: 'Product should be either: HP, PCP.'
                }
            },
            cash_price: {
                type: Number,
                required: true,
                min: 0,
                max: 9999999.99
            },
            deposit_amount: {
                type: Number,
                required: true,
                min: 0,
                max: 9999999.99
            },
            term: {
                type: Number,
                required: true,
                min: 12,
                max: 99
            }
        },
        vehicle: {
            vehicle_code: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 5
            },
            vehicle_mileage: {
                type: Number,
                required: true,
                min: 0,
                max: 9999999.99
            },
            registration_month: {
                type: Number,
                required: true,
                min: 1,
                max: 12
            },
            registration_year: {
                type: Number,
                required: true,
                min: 1920,
                max: 9999
            },
            make: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 250
            },
            model: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 250
            },
            description: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 250
            },
            model_year: {
                type: Number,
                required: true,
                min: 1920,
                max: 9999
            }
        },
        excess_mileage: {
            type: Number,
            required: true,
            min: 0,
            max: 9999999.99
        },
        max_annual_mileage: {
            type: Number,
            min: 0,
            max: 9999999.99
        },
        first_payment_amount: {
            type: Number,
            required: true,
            min: 0,
            max: 9999999.99
        },
        monthly_payment_amount: {
            type: Number,
            required: true,
            min: 0,
            max: 9999999.99
        },
        final_payment_amount: {
            type: Number,
            required: true,
            min: 0,
            max: 9999999.99
        },
        amount_of_credit: {
            type: Number,
            required: true,
            min: 0,
            max: 9999999.99
        },
        total_charge_for_credit: {
            type: Number,
            required: true,
            min: 0,
            max: 9999999.99
        },
        fixed_rate_interest: {
            type: Number,
            required: true,
            min: 0,
            max: 99.99
        },
        apr: {
            type: Number,
            required: true,
            min: 0,
            max: 99.99
        },
        total_amount_payable: {
            type: Number,
            required: true,
            min: 0,
            max: 9999999.99
        },
        dealer_id: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 8
        },
        created_datetime: {
            type: Date,
            default: Date.now
        },
        decision: {type: String},
        customer: {
            first_name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 250
            },
            surname: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 250
            },
            date_of_birth: {
                type: Date,
                required: [true, 'Date of Birth is required.']
            },
            email: {
                type: [mongoose.SchemaTypes.Email, 'Invalid Email'],
                required: [true, 'Email is required. Please enter email address']
            },
            address: {
                address1: {
                    type: String,
                    required: true,
                    minlength: 2,
                    maxlength: 250
                },
                address2: {
                    type: String,
                    minlength: 2,
                    maxlength: 250
                },
                address3: {
                    type: String,
                    minlength: 2,
                    maxlength: 250
                },
                postcode: {
                    type: String,
                    required: true,
                    minlength: 2,
                    maxlength: 8
                },
                town: {
                    type: String,
                    required: true,
                    minlength: 2,
                    maxlength: 50
                },
                city: {
                    type: String,
                    required: true,
                    minlength: 2,
                    maxlength: 50
                }
            }
        }      
    }   
);

module.exports = mongoose.model("Proposal", proposalSchema, "Proposal");