const httpStatus = require('http-status');
const vehiclesCollection = require('../models/vehicle.model');
const Dealer_StockCollection = require('../models/Dealer_Stock.model');

//Get Makes
exports.getMakes = async (req, res, next) => {
    console.log('we are on Get Makes - api/v1/vehicles/make? api');
    try {
        let dealer_id = req.query.dealer_id;
        console.log('dealer id = ' + dealer_id);

        var myPromise = () => {
            return new Promise((resolve, reject) => {
                if (dealer_id == undefined) {
                    vehiclesCollection.distinct("make_name").then(function (makes, err) {
                        if (err) {
                            reject({
                                message: "Something went wrong!!!. " + err,
                                status_code: httpStatus.INTERNAL_SERVER_ERROR
                            });
                        }
                        else if (makes.length == 0) {
                            console.log('No makes found.');
                            reject({
                                message: 'No makes found.',
                                status_code: httpStatus.BAD_REQUEST
                            });
                        }
                        else { resolve(makes); }
                    });
                }
                else {
            
                    Dealer_StockCollection.distinct("vehicle_code", { "dealer_id": dealer_id }).then(function (vehiclecodes, err) {
                        console.log("Vehicle Codes: ", vehiclecodes);
                        if (err) {
                            reject({
                                message: "Something went wrong!!!. " + err,
                                status_code: httpStatus.INTERNAL_SERVER_ERROR
                            });
                        }
                        else if (vehiclecodes == undefined || vehiclecodes.length == 0) {
                            console.log('No vehicle(s) found for this dealer.');
                            reject({
                                message: 'No vehicle(s) found for this dealer.',
                                status_code: httpStatus.BAD_REQUEST,
                                input_params: req.query
                            });
                        }
                        else {
                            vehiclesCollection.distinct("make_name", { "vehicle_code": vehiclecodes }).then(function (makes, err) {
                                console.log("Makes: ", makes);
                                if (err) {
                                    reject({
                                        message: "Something went wrong!!!. " + err,
                                        status_code: httpStatus.INTERNAL_SERVER_ERROR
                                    });
                                }
                                else if (makes.length == 0) {
                                    reject({
                                        message: 'Vehicle(s) found but No make(s) found for this dealer',
                                        status_code: httpStatus.BAD_REQUEST,
                                        input_params: req.query
                                    });
                                }
                                else {
                                    resolve(makes);
                                }
                            });
                        }
                    });
                }
            });
        };
        await myPromise().then(result => {
            console.log(result);
            res.status(httpStatus.OK).json(result);
        }).catch(err => {
            res.status(err.status_code).json(err);
        });
    } catch (er)
    {
        next(er);
    }
};

//Get Models based on given make
exports.getModels = async (req, res, next) => {
    console.log('we are on Get Models - api/v1/vehicles/make/2/models api');
    await vehiclesCollection.distinct("model_name", { "make_name": req.params.make_name })
        .then(result => {
            console.log("Models List from Database", result);
            if (result.length > 0) {
                res.status(httpStatus.OK).json(result);
            }
            else {
                res.status(httpStatus.BAD_REQUEST).json({
                    message: "No Models found for this Make: " + req.params.make_name ,
                    status_code: httpStatus.BAD_REQUEST
                });
            }
        })
        .catch(err => {
            next(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: "Something went wrong. " + err,
                status_code: httpStatus.INTERNAL_SERVER_ERROR
            });
        });
}

// Get Descriptions based on given make and model
exports.getDescriptions = async (req, res, next) => {
    
    console.log('we are on Get Descriptions - api/v1/vehicles/make/2/models/23/descriptions api');
    await vehiclesCollection.distinct("description",
        {
            "make_name": req.params.make_name,
            "model_name" : req.params.model_name
        })
        .then(result => {
            console.log("Descriptions List from Database", result);
            if (result.length > 0) {
                res.status(httpStatus.OK).json(result);
            }
            else {
                res.status(httpStatus.BAD_REQUEST).json({
                    message: "No Description found for this Make : " + req.params.make_name + "Models: " + req.params.model_name ,
                    status_code: httpStatus.BAD_REQUEST
                });
            }
        })
        .catch(err => {
            next(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: "Something went wrong. " + err,
                status_code: httpStatus.INTERNAL_SERVER_ERROR
            });
        });
}

//Get Vehicles based on filter
exports.getVehicles = async (req, res, next) => {
    console.log('we are on Get vehicles - api/v1/vehicles? api');
    try {
        let make = req.query.make_name;
        let model = req.query.model_name;
        let desc = req.query.description;

        console.log(`Query Params: [make, model, description [${make},${model},${desc}]`);
        
        let vehicles = await vehiclesCollection.find(req.query);
        
        console.log('Picked vehicles : ' + vehicles);
        
        if (vehicles != '')
        {
            res.status(httpStatus.OK).json(vehicles);
        }
        else
        {
            res.status(httpStatus.BAD_REQUEST).json({
                message: 'No vehicles(s) found',
                status_code: httpStatus.BAD_REQUEST,
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
        var vehicle = await vehiclesCollection.find({"vehicle_code" : req.params.id});

        if (vehicle != '') {
            res.status(httpStatus.OK).json(vehicle);
        }
        else {
            res.status(httpStatus.BAD_REQUEST).json({
                message: 'No vehicles(s) found',
                status_code: httpStatus.BAD_REQUEST,
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