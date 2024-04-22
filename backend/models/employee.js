const mongoose = require('mongoose');

var conn = mongoose.Collection;

const EmpSchema = new mongoose.Schema({
  department: { type: String },
  name: {
    type: String,
    required: true,
  },
  mobile: { type: Number },
  gender: { type: String },
  dob: { type: Date },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salary: { type: Number },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }

});


var empModel = mongoose.model('Employees', EmpSchema);
module.exports = empModel;