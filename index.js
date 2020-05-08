//Third party
const express = require('express');
const routes = require('./routes/vehicleRoutes');


const app = express();

//app.use(express.json());
app.use('/', routes);

//const vehicle = require('./data/vehicleData');

//Get all persons
// app.get('/:make/:model',(req,res)=>{
    
//     var modelList = vehicle.vehiclesData.filter(a => (a.make === req.params.make &&
//         a.model === req.params.model))
//     .map(a=>a.de);
//     res.json(modelList);
// })


//Get Model by model year
// app.get('/makes',async(req,res)=>{
//     const makeList = await vehicle.vehiclesData.map(a => a.make)//.unique();    
//     res.json(makeList);
// })

// //Post
// app.post('/',async(req,res)=>{
//     mypersons.push(req.body);
//     res.json(mypersons);
// })

// app.get('/about',(req,res)=>{
//     res.json('Hi I am about');
// })

//localhost
app.listen(2000, ()=>
{
    console.log('Server started on port 2000');
}
);