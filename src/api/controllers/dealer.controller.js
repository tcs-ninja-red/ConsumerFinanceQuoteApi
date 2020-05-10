const httpStatus = require('http-status');
const dealerCollection = require('../models/dealer.model');

exports.getDealers = async (req, res, next) => {
    console.log('we are on Get dealers - api/v1/dealers? api');
    try {
        let postcode = req.query.postcode;
        console.log('Postcode = ' + postcode);
        
        let dealers = null;
        if (typeof(postcode) != 'undefined') {
            dealers = await dealerCollection.Dealers.filter(x => x.postcode.toLowerCase() === postcode.toLowerCase());
        }
        else { dealers = await dealerCollection.Dealers; }
        
        console.log('Picked dealers : ' + dealers);
        
        if (dealers != '')
        {
            res.status(httpStatus.OK).json(dealers);
        }
        else
        {
            res.status(httpStatus.NOT_FOUND).json({
                message: 'No dealer(s) found',
                status_code: httpStatus.NOT_FOUND,
                input_params: req.query
            });
        }
    } catch (er)
    {
        next(er);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: er,
            status_code: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
};