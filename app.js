
const express       = require("express");
const nodemailer    = require("nodemailer");
const bodyParser    = require("body-parser");
const cookieParser  = require('cookie-parser');
const logger        = require("morgan");
const mongoose      = require("mongoose");
const mongodb       = require('mongodb');
const path          = require('path');
const router        = express.Router();	  

// var routes       = require('./routes/routes.js');
//contact form submission mongoose
// var Example   = require("./models/mongooseModel.js")
// var Promise   = require("bluebird");

let PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

const app = express();
//middleware

app.use('/static', express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname + 'css')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static('models'));
const routes = require('./routes');
app.use(routes);

// mongoose.connect("mongodb://localhost/portfoliojade");
 const uri = 'mongodb://danielarnost:Kyanite900@ds145312.mlab.com:45312/portfoliojade';
 mongoose.connect(uri);

// mongoose.connect(mongoDB);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB conn error'));


// MONGOLAB_URI =' mongodb://danielarnost:Kyanite@55@ds145312.mlab.com:45312/portfoliojade'
//  mongoose.connect(process.env.MONGOLAB_URI, function (err)
//  {
// if (err) {
//   console.log('mongolab connection error')
// }else{console.log('mongolab connected')}

//  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error:'));

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//templates
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//server function
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});