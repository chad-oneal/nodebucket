/*
============================================
; Title: index.js
; Author: Professor Krasso
: Modified by: Chad ONeal
; Date: 03/25/2023
; Description: index.js for nodebucket
============================================
*/

// Require statements
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const createError = require('http-errors');
const employeeAPI = require('./routes/employee-routes');

// Create the Express application.
const app = express();

/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

// default server port value.
const PORT = process.env.PORT || 3000;

const CONN = 'mongodb+srv://nodebucket_user:s3cret@bellevueuniversity.ox0t9kr.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection.
 */
mongoose.connect(CONN).then(() => {
  console.log('Connection to the database was successful');
}).catch(err => {
  console.log('MongoDB Error: ' + err.message);
});

/**
 * APIs go here
*/
// localhost:3000/api/employees/:empId
app.use("/api/employees", employeeAPI);

// Catch-all 404
app.use(function(req, res, next) {
  next(createError(404))
})

// Error handler
app.use(function(err, req, res, next) {

  res.status(err.status || 500)

  res.send({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log('Application started and listening on PORT: ' + PORT);
})
