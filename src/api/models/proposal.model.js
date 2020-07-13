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
        decision: {
            decision_status: { type: String },
            decision_message: { type: String }
        },
        customer: {
            title: {
                type: String,
                required: true,
                enum: {
                    values: ['Dr', 'Mr', 'Mrs', 'Miss', 'Ms', 'Rev'],
                    message:"Invlaid Title. Title should be either: 'Dr', 'Mr', 'Mrs', 'Miss', 'Ms', 'Rev' "
                }
            },
            fore_name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
            },
            middle_name: {
                type: String,
                required: false,
                minlength: 2,
                maxlength: 50
            },
            surname: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
            },
            date_of_birth: {
                type: Date,
                required: [true, 'Date of Birth is required.']
            },
            email: {
                type: [mongoose.SchemaTypes.Email, 'Invalid Email'],
                required: [true, 'Email is required. Please enter email address']
            },
            phone: {
                type: String,
                required: true,
                validate: {
                    validator: function (v) {
                        if (v === undefined) return true;
                        return /^(\(?07\)?)\d{9}$/.test(v);
                    },
                    message: 'Please enter a valid phone Number'
                }
            },
            gender: {
                type: String,
                required: true,
                enum: {
                    values: ['M', 'F', 'U', 'X'],
                    message:"Invlaid Gender. Gender should be either: 'M', 'F', 'U', 'X' "
                }
            },
            marital_status: {
                type: String,
                required: true,
                enum: {
                    values: ['D', 'M', 'S', 'SE', 'W'],
                    message:"Invlaid Marital Status. Marital status should be either: 'D', 'M', 'S', 'SE', 'W' "
                }
            },
            country_of_origin: {
                type: String,
                required: true,
                minlength: 2,
                maxlength:4
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
                    validate: {
                        validator: function (v) {
                            if (v === undefined) return true;
                            return /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/.test(v);
                        },
                        message: 'Please enter a valid post code.'
                    }
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
                },
                time_at_address: {
                    type: Number,
                    required: true,
                    min: 1, 
                    max: 600
                }
            },
            employment: {
                occupation: {
                    type: String,
                    required: true,
                    minlength: 1,
                    maxlength:20
                },
                years_at_employment: {
                    type: Number,
                    required: true,
                    min: 0, 
                    max: 10
                },
                months_at_employment: {
                    type: Number,
                    required: true,
                    min: 0, 
                    max: 12
                },
                gross_annual_salary: {
                    type: Number,
                    required: true,
                    min: 0, 
                    max: 999999999.99
                }
            },
            bank_account: {
                account_name: {
                    type: String,
                    required: true,
                    minlength: 5,
                    maxlength: 50
                },
                account_number: {
                    type: Number,
                    required: true,
                    min: 10000000,
                    max: 99999999
                },
                sort_code: {
                    type: Number,
                    required: true,
                    min: 10000,
                    max: 99999
                }
            }
        }
    }
);

module.exports = mongoose.model("Proposal", proposalSchema, "Proposal");