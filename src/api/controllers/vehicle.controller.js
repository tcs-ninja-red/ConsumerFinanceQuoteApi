const httpStatus = require('http-status');
const vehiclesCollection = require('../models/vehicle.model');
const Dealer_StockCollection = require('../models/Dealer_Stock.model');

//Get Makes
exports.getMakes = async (req, res, next) => {
    console.log('we are on Get Makes - api/v1/vehicles/make? api');
    try {
        let dealer_id = req.query.dealer_id;
        console.log('dealer id = ' + dealer_id);
        
        let dealerstock = null;
        if (dealer_id == undefined) {
            dealerstock = await vehiclesCollection.distinct("make_name");
            console.log('Picked Makes : ' + dealerstock);
            //console.log("$dealer_stock_vehicles");
            if (dealerstock  != ''){
                res.status(httpStatus.OK).json(dealerstock);
            }
            else {
                res.status(httpStatus.NOT_FOUND).json({
                message: 'No vehicles(s) found',
                status_code: httpStatus.NOT_FOUND,
                input_params: req.query
               });
            }
        }
        else {
            vehiclesCollection.aggregate([
                {
                    $lookup: {
                        from: "Dealer_Stock",
                        localField: "vehicle_code",
                        foreignField: "vehicle_code",
                        as: "dealer_stock_vehicles"
                    }
                },
                {
                   $match:{
                       $and:[{"dealer_stock_vehicles.dealer_id" : dealer_id}]
                    }
                },
                {
                    $project:{
                        _id : 0,
                        make_name : '$make_name'            
                    }
                }
 
            ],
            function (err, response) {
                console.log(err,response)
                let uniquemakes = [...new Set(response.map(item => item.make_name))];    
                //console.log(uniquemakes)
                res.status(httpStatus.OK).json(uniquemakes);
            }
            );
    
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
                res.status(httpStatus.NOT_FOUND).json({
                    message: "No Models found for this Make: " + req.params.make_name ,
                    status_code: httpStatus.NOT_FOUND
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
                res.status(httpStatus.NOT_FOUND).json({
                    message: "No Description found for this Make : " + req.params.make_name + "Models: " + req.params.model_name ,
                    status_code: httpStatus.NOT_FOUND
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
        var vehicle = await vehiclesCollection.find({"vehicle_code" : req.params.id});

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