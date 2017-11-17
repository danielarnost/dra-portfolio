const express  = require('express');
const router   = express.Router();

// var routes       = require('./routes/routes.js');
//contact form submission mongoose
var Example   = require("../models/mongooseModel.js")
var Promise   = require("bluebird");

router.get('/', (req, res) => {  
  res.render('index');
});

router.get('/work', (req, res) => { 
    res.render('work'); 
});
router.get('/contact', (req, res) => { 
    res.render('contact'); 
});




router.post("/contact/submit", (req, res, next) => {
 
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

module.exports = router;