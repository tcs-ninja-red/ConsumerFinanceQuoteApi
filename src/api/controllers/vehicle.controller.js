const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const vehiclesCollection = require('../models/vehicle.model');

console.log('I am in vehicles controller');

//Get Makes
exports.getMakes = async (req, res, next) => {
    try {
        let modelYear = req.query.model_year;
        res.status(httpStatus.OK).json('list vehicle makes');
        
    } catch (error) {
        next(error);
        res.status(httpStatus.NOT_FOUND);
    }
}

exports.getModels = async (req, res, next) => {
    try {
        res.status(httpStatus.OK).json('list vehicle models');
        
    } catch (error) {
        next(error);
        res.status(httpStatus.NOT_FOUND);
    }
}

exports.getDescriptions = async (req, res, next) => {
    try {
        res.status(httpStatus.OK).json('list vehicle descriptions');
        
    } catch (error) {
        next(error);
        res.status(httpStatus.NOT_FOUND);
    }
}

exports.getVehicles = async (req, res, next) => {
    try {
        res.status(httpStatus.OK).json({
		    message: 'Vehicle Detail',
		    timestamp: new Date().toISOString(),
		    IP: req.ip,
		    URL: req.originalUrl,
        });
    } catch(e) {
        next(e);
        res.status(httpStatus.NOT_FOUND);
    }
};