
var express       = require("express");
var nodemailer    = require("nodemailer");
var bodyParser   = require("body-parser");
var cookieParser = require('cookie-parser');
var logger       = require("morgan");
var mongoose     = require("mongoose");
var mongodb = require('mongodb')

var path         = require('path');	  
// var routes       = require('./routes/routes.js');
//contact form submission mongoose
var Example   = require("./models/mongooseModel.js")
var Promise   = require("bluebird");

var PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

var app = express();
//middleware

app.use('/static', express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname + 'css')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.get('/', function(req, res){
  res.render('index');
});

app.get('/work', function(req, res){ 
    res.render('work'); 
});
app.get('/contact', function(req, res){ 
    res.render('contact'); 
});

app.use(express.static('models'));


app.post("/contact/submit", function(req, res, next) {
 
  // Inserting an array and a boolean into the req.body object for example purposes
  req.body.array = ["item1", "item2", "item3"];
  // Remember, we have to specify booleans on the server--the front-end can only send strings
  req.body.boolean = false;

  // We use the "Example" class we defined above
  // to check our req.body against our Example model
  var content = new Example(req.body);

  // With the new Example object created, we can save our data to mongoose
  // Notice the different syntax. The magic happens in exampleModel.js
  content.save(function(error, doc) {
    // Send any errors to the browser
    if (error) {
      //add try again
      res.redirect('/contact')
          }
    // Otherwise, send the new doc to the browserTOOK THIS ( res.send(doc);) OUT, STILL STORES IN MONGODB
    else {      
      res.redirect('/');
        
    }
  });
});
// mongoose.connect("mongodb://localhost/portfoliojade");
 var uri = 'mongodb://danielarnost:Kyanite900@ds145312.mlab.com:45312/portfoliojade';
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

var db = mongoose.connection;

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