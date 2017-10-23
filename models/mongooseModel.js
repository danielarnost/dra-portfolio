
var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var mongooseSchema = new Schema({
  
  name: {
    type: String,
    trim: true   
  },
  
  // This will only take a string that looks like an email
  // It must match the regex before it's accepted
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
  },
  
 longstring: {
    type: String,
    validate: [
      // Function takes in the value as an argument
      function(input) {
        // If this returns true, proceed. If not, return an error message
        return input.length >= 6;
      },
      // Error Message
      "Longstring should be longer."
    ]
  }
});

// create a model from the mongoose schema
var Portfolio = mongoose.model("Portfolio", mongooseSchema);

// export the module to be required by app.js
module.exports = Portfolio