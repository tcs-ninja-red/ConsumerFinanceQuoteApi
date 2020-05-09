const express = require('express');

// import all the routes here
const vehicleRoute = require('./vehicle.route');
const dealerRoute = require('./dealer.route');

console.log('I am in route/index');

const router = express.Router();

/**
 * GET v1/healthcheck
 */
router.get('/healthcheck', (req, res) => {
	console.log('I am in route/index - status api');
	res.json({
		message: 'OK',
		timestamp: new Date().toISOString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
});

router.use('/vehicles', vehicleRoute);
router.use('/dealers', dealerRoute);

module.exports = router;