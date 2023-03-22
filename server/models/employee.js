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
