const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const vehiclesCollection = require('../models/vehicle.model');

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

//Get Vehicles based on filter
exports.getVehicles = async (req, res, next) => {
    console.log('we are on Get vehicles - api/v1/vehicles? api');
    try {
        var make = req.query.make_name;
        var model = req.query.model_name;
        var desc = req.query.description;
        var modelYear = req.query.model_year

        console.log('Query Params: ' + req.query);
        
        var vehicles = null;
        if (typeof(make) != 'undefined' || typeof(model) != 'undefined' || typeof(desc) != 'undefined' || typeof(model_year) != 'undefined') {
            vehicles = vehiclesCollection.Vehicles.filter(x => (
                x.make_name === make
                || x.model_name === model
                || x.description === desc
                || x.model_year === modelYear));
        }
        else { vehicles = vehiclesCollection.Vehicles;}
        
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
exports.getVehicleInfo = (req, res) => {
    console.log('we are on Get vehile info - api/v1/vehicles/1 api');
    console.log('query params: ' + req.params.id);
    res.status(httpStatus.OK).json('Vehicle info here - ' + req.params.id);
}