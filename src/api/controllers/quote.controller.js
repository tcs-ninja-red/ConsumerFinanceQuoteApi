const httpStatus = require('http-status');

//const quoteCollection = require('../models/quote.model');

exports.calculateQuote = (req, res, next) => {
    console.log('we are on Calculate Quote - api/v1/quotes api');
    console.log(req.body);
    
    try {
        const quoteRequest = req.body;    
        res.status(httpStatus.OK).json(req.body);
    } catch (er)
    {
        next(er);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: er,
            status_code: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
};