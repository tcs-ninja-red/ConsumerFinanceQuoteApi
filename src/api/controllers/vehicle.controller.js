const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const vehiclesCollection = require('../models/vehicle.model');

console.log('I am in vehicles controller');

//Get Makes
exports.getMakes = async (req, res, next) => {
    try {
        //let modelYear = req.query.model_year;
        //res.status(httpStatus.OK).json('list vehicle makes');
        const makeList = await vehiclesCollection.vehicles.map(a => a.make_name)
        .filter((value, index, self) => self.indexOf(value) === index);
        res.status(httpStatus.OK).json(makeList);
        
    } catch (error) {
        next(error);
        res.status(httpStatus.NOT_FOUND);
    }
}

exports.getModels = async (req, res, next) => {
    try {
        //res.status(httpStatus.OK).json('list vehicle models');
        const modelList = await vehiclesCollection.vehicles.filter(e => e.make_name === req.params.make_name)
        .map(a => a.model_name);

        res.status(httpStatus.OK).json(modelList);
        
    } catch (error) {
        next(error);
        res.status(httpStatus.NOT_FOUND);
    }
}

exports.getDescriptions = async (req, res, next) => {
    try {
        //res.status(httpStatus.OK).json('list vehicle descriptions');
        var descriptionList = vehiclesCollection.vehicles.filter(a => (a.make_name === req.params.make_name &&
            a.model_name === req.params.model_name))
        .map(a=>a.description);

      res.status(200).json(descriptionList);
        
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