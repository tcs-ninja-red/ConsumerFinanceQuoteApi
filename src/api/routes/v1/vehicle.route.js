const express = require('express');

const controller = require('../../controllers/vehicle.controller')
const router = express.Router();

router.route('/makes').get(controller.getMakes);
router.route('/makes/:make_name/models').get(controller.getModels);
router.route('/makes/:make_name/models/:model_name/descriptions').get(controller.getDescriptions);
router.route('/').get(controller.getVehicles);
router.route('/:id').get(controller.getVehicleInfo);

module.exports = router;