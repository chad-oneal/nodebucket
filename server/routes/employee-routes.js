/*
============================================
; Title: employee-routes.js
; Author: Professor Krasso
: Modified by: Chad ONeal
; Date: 03/25/2023
; Description: employee-routes.js for nodebucket
============================================
*/

// Require statements
const express = require('express');
const Employee = require ('../models/employee');


const router = express.Router();

//YAML for Swagger testing
/**
* findEmployeeById
* @openapi
* /api/employees/{empId}:
*   get:
*     description:  API for returning employees via employeeId
*     summary: Returns employee info from employeeId
*     parameters:
*       - name: empId
*         in: path
*         required: true
*         description: Employees ID
*         schema:
*           type: Number
*     responses:
*       '200':
*         description: Employee document
*       '401':
*         description: Invalid employeeId
*       '500':
*         description: Server exception
*       '501':
*         description: MongoDB exception
*/

// FindEmployeeById API
router.get('/:id', (req, res, next) => {

  let empId = req.params.id
  empId = parseInt(empId, 10)

  //analyzing empId to ee if the employee id entered was a number.  If not a number, display the id entered and bad request.
  if(isNaN(empId)) {
      const err = new Error('Bad Request')
      err.status = 400
      console.error('empId can not be found:', err.message)
      next(err)
  } else {
      Employee.findOne({'empId': req.params.id}, function(err, emp) {
          if (err) {
              console.error('mongodb error:', err)
              next(err)
          } else {
              console.log('emp:', emp)
              res.send(emp)
          }
      })
  }
})

// Export the router
module.exports = router;
