const httpStatus = require('http-status');
const vehiclesCollection = require('../models/vehicle.model');

//Get Makes
exports.getMakes = async (req, res, next) => {
    try {
        const makeList = await vehiclesCollection.Vehicles.map(a => a.make_name)
        .filter((value, index, self) => self.indexOf(value) === index);
        res.status(httpStatus.OK).json(makeList);
        
    } catch (error) {
        next(error);
        res.status(httpStatus.NOT_FOUND);
    }
}

//Get Models based on given make
exports.getModels = async (req, res, next) => {
    try {
        const modelList = await vehiclesCollection.Vehicles.filter(e => e.make_name === req.params.make_name)
        .map(a => a.model_name);

        res.status(httpStatus.OK).json(modelList);
        
    } catch (error) {
        next(error);
        res.status(httpStatus.NOT_FOUND);
    }
}

// Get Descriptions based on given make and model
exports.getDescriptions = async (req, res, next) => {
    try {
        var descriptionList = await vehiclesCollection.find({"make_name" : req.params.make_name,
        "model_name" : req.params.model_name})
        .select({"description" : 1, "_id" : 0});

      res.status(httpStatus.OK).json(descriptionList);
        
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
        
        let vehicles = null;
        if (make != undefined || model != undefined || desc != undefined || modelYear != undefined) {
            vehicles = await vehiclesCollection.find({
                "make_name" : make,
                "model_name" : model,
                "description" : desc});
        }
        else {
            vehicles = await vehiclesCollection.find();
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
        var vehicle = await vehiclesCollection.find({"vehicle_id" : req.params.id});

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