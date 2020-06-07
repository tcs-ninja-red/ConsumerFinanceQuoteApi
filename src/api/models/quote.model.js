//Request & Response Payload Json

const quoteModel = {
    "financial": {
        "product": "string",
        "cash_price": "decimal",
        "deposit_amount": "decimal",
        "term": "decimal"
    },
    "vehicle": {
        "vehicle_mileage": "integer",
        "registration_month": "integer",
        "registration_year": "integer",
        "make": "string",
        "model": "string",
        "description": "string",
        "model_year": "integer"
    },
    "excess_mileage": "integer",
    "max_annual_mileage": "integer",
    "first_payment_amount": "decimal",
    "monthly_payment_amount": "decimal",
    "final_payment_amount": "decimal",
    "amount_of_credit": "decimal",
    "total_charge_for_credit": "decimal",
    "fixed_rate_interest": "decimal",
    "apr": "decimal",
    "total_amount_payable": "decimal"
}

module.exports.Quote = quoteModel;