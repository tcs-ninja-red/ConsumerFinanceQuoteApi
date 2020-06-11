const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL; 

// Database Name
const dbName = 'MotorFinanceDB';

function connect() {
  mongoose.set('useUnifiedTopology', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.connect(url, (err) => {
    if(err) {console.log('DB not connected' + err)}
    else{ console.log('DB connected successfully')};
  })
}
  
module.exports.connect = connect();