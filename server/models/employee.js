/*
============================================
, Title: employee.js
; Author: Professor Krasso
: Modified by: Chad ONeal
; Date: 03/25/2023
; Description: employee.js for nodebucket
============================================
*/


// Require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the employee schema
let employeeSchema = new Schema({
  empId: { type: Number, unique: true, required: true },
  firstName: { type: String },
  lastName: { type: String },
}, { collection: 'employees' });

// Export the model
module.exports = mongoose.model('Employee', employeeSchema);
