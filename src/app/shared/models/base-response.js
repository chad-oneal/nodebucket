/*
============================================
; Title: base-response.js
; Author: Professor Krasso
: Modified by: Chad ONeal
; Date: 03/30/2023
; Description: base-response.js for nodebucket
============================================
*/

// Allows us to store server responses
class BaseResponse {
  constructor (httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }
  toObject () {
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
      timestamp: new Date().toLocaleString('en-US')
    }
  }
}

module.exports = BaseResponse;
