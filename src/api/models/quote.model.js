//Request Payload Json

const quoteRequest = {
    financial: {
        product: String, // HP or PCP
        cash_price: decimal,
        deposits: {
            cash_deposit: decimal,
            cheque_deposit: decimal,
            card_deposit: decimal,
            total_deposit: decimal
        },
        term: decimal,
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
        cash_price: decimal,
        deposits: {
            cash_deposit: decimal,
            cheque_deposit: decimal,
            card_deposit: decimal,
            total_deposit: decimal
        },
        term: decimal
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
    first_payment_amount: decimal,
    monthly_payment_amount: decimal,
    final_payment_amount: decimal,
    amount_of_credit: decimal,
    total_charge_for_credit: decimal,
    fixed_rate_interest: decimal,
    apr: decimal,
    total_amount_payable: decimal
}