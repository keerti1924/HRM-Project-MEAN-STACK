const mongoose = require('mongoose');

var conn = mongoose.Collection;
// Define the schema for the Contact model
var contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    // You may want to add unique index constraint if you want unique emails
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create the Contact model based on the schema
var Contact = mongoose.model('Contact', contactSchema);

// Export the Contact model
module.exports = Contact;