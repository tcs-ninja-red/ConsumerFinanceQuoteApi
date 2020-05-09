const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const vehiclesCollection = require('../models/dealer.model');

console.log('I am in dealer controller');

exports.getDealers = async (req, res, next) => {
    try {
        res.status(httpStatus.OK).json({
		    message: 'Dealer Detail',
		    timestamp: new Date().toISOString(),
		    IP: req.ip,
		    URL: req.originalUrl,
        });
    } catch(e) {
        next(e);
        res.status(httpStatus.NOT_FOUND);
    }
};