/*
============================================
, Title: base-response.js
; Author: Professor Krasso
: Modified by: Chad ONeal
; Date: 03/28/2023
; Description: base-response.js for nodebucket
============================================
*/

// class containing the base response for the API
class BaseResponse {
    constructor(httpCode, message, data) {
        this.httpCode = httpCode;
        this.message = message;
        this.data =data
}

// method to convert the object to a JSON object
toObject () {
  return {
    httpCode: this.httpCode,
    message: this.message,
    data: this.data,
    timestamp: new Date(). toLocaleDateString('en-Us')
    }
   }
}

// export the class
module.exports = BaseResponse;
