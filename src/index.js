const app = require('./config/express.config');

app.get('/', (req, res) => {
    res.json('You are at home');
});

app.get('/status', (req, res) => {
	res.json({
		message: 'OK',
		timestamp: new Date().toISOString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
});

//listen to requests

app.listen(2000,(err) => {
    if(err){
        console.log('Server failed to start - ' + err);
    }
    console.log('Server started on port 2000');
});