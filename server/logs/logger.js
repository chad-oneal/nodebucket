/*
============================================
, Title: logger.js
; Author: Professor Krasso
: Modified by: Chad ONeal
; Date: 03/28/2023
; Description: logger.js for nodebucket
============================================
*/

// Require statements
const { appendFileSync } = require('fs');
const { join } = require('path');

// Logging
const debugLog = join(__dirname, 'debug.log')
const errorLog = join(__dirname, 'error.log')

// Get date and time
const getDateTime = () => {
  const now = new Date()
  return now.toLocaleString('en-US')
}

// Export the logger
module.exports.debugLogger = (data) => {
  const logString = `[${getDateTime()}] server\t ${data.filename} - ${data.message}\n`
  appendFileSync(debugLog, logString)
}

// Export the logger
module.exports.errorLogger = (data) => {
  const logString = `[${getDateTime()}] server\t ${data.filename} - ${data.message}\n`
  appendFileSync(errorLog, logString)
}
