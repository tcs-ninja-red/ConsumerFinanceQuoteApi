//Request Payload Json

const quoteRequest = {
    financial: {
        product: String, // HP or PCP
        cash_price: Number,
        deposits: {
            cash_deposit: Number,
            cheque_deposit: Number,
            card_deposit: Number,
            total_deposit: Number
        },
        term: Number,
        max_annual_mileage: Int32Array
    },
    vehicle: {
        vehicle_mileage: Int32Array,
        registration_month: Int32Array,
        registration_year: Int32Array,
        make: String,
        model: String,
        description: String,
        model_year: Int32Array
    }
}

//Response Payload Json

const quoteResponse = {
    financial: {
        product: String, // HP or PCP
        cash_price: Number,
        deposits: {
            cash_deposit: Number,
            cheque_deposit: Number,
            card_deposit: Number,
            total_deposit: Number
        },
        term: Number
    },
    vehicle: {
        vehicle_mileage: Int32Array,
        registration_month: Int32Array,
        registration_year: Int32Array,
        make: String,
        model: String,
        description: String,
        model_year: Int32Array,
        excess_mileage: Int32Array
    },
    max_annual_mileage: Int32Array,
    first_payment_amount: Number,
    monthly_payment_amount: Number,
    final_payment_amount: Number,
    amount_of_credit: Number,
    total_charge_for_credit: Number,
    fixed_rate_interest: Number,
    apr: Number,
    total_amount_payable: Number
}
