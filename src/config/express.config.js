const express = require('express');

const routes = require('../api/routes/v1/index');

const app = express();

//mount api v1 routes
app.use('/api/v1', routes);

module.exports = app;