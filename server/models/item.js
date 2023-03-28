/*
============================================
, Title: item.js
; Author: Professor Krasso
: Modified by: Chad ONeal
; Date: 03/28/2023
; Description: item.js for nodebucket
============================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: { type: String }
})

module.exports = itemSchema;
