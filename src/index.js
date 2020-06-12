const { port, env } = require('./constants');
const app = require('./config/express.config');
const mongo = require('./dbconnection');

//DB connection
mongo.connect;

// Server healthcheck
app.get('/help', (req, res) => {
	res.json({
		message: 'In Service',
		timestamp: new Date().toISOString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
});

//listen to requests

app.listen(port,(err) => {
    if(err){
        console.log('Server failed to start - ' + err);
    }
    console.log(`server started [env, port] = [${env}, ${port}]`);
});