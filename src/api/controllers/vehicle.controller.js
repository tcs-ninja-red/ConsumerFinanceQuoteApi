const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const vehiclesCollection = require('../models/vehicle.model');

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

//Get Vehicles based on filter
exports.getVehicles = async (req, res, next) => {
    console.log('we are on Get vehicles - api/v1/vehicles? api');
    try {
        let make = req.query.make_name;
        let model = req.query.model_name;
        let desc = req.query.description;
        let modelYear = req.query.model_year;

        console.log(`Query Params: [make, model, description, model_year [${make},${model},${desc},${modelYear}]`);
        
        var vehicles = null;
        if (make != undefined || model != undefined || desc != undefined || modelYear != undefined) {
            vehicles = await vehiclesCollection.Vehicles.filter(x => (
                x.make_name === make
                && x.model_name === model
                && x.description === desc));
        }
        else {
            vehicles = await vehiclesCollection.Vehicles;
        }
        
        console.log('Picked vehicles : ' + vehicles);
        
        if (vehicles != '')
        {
            res.status(httpStatus.OK).json(vehicles);
        }
        else
        {
            res.status(httpStatus.NOT_FOUND).json({
                message: 'No vehicles(s) found',
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
  
//Get Vehicle details based in id
exports.getVehicleInfo = async (req, res) => {
    console.log('we are on Get vehile info - api/v1/vehicles/1 api');
    console.log('query params: ' + req.params.id);
    
    try {
        var vehicle = await vehiclesCollection.Vehicles.filter(x => x.vehicle_id === req.params.id);

        if (vehicle != '') {
            res.status(httpStatus.OK).json(vehicle);
        }
        else {
            res.status(httpStatus.NOT_FOUND).json({
                message: 'No vehicles(s) found',
                status_code: httpStatus.NOT_FOUND,
                input_params: req.params.id
            });
        }
    }
    catch(er) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: er,
            status_code: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
}