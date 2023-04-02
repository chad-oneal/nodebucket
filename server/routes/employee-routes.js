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
const { debugLogger, errorLogger } = require('../logs/logger');
const createError = require('http-errors');
const Ajv = require('ajv')
const BaseResponse = require('../models/base-response');

// Logging and Validation
const myFile = 'employee-route.js';
const ajv = new Ajv()

// function to determine empId is a number
const checkNum = (id) => {
  id = parseInt(id, 10)
  if (isNaN(id)) {
    // Error handling if id is not a number
    const err = new Error('Bad Request')
    err.status = 400
    console.error('id could not be parsed: ', id)
    errorLogger({filename: myFile, message: `id could note be parsed: ${id}`})
    return err
  } else {
    return false
  }
}

// Schema for Validation
const taskSchema = {
  type: 'object',
  properties: {
    text: {type: 'string'}
  },
  required: ['text'],
  additionalProperties: false
}

/**
* findEmployeeById
* @openapi
* /api/employees/{id}:
*   get:
*     tags:
*       - Employees
*     description:  API for returning an employee document
*     summary: returns an employee document
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: Employee ID
*         schema:
*           type: number
*     responses:
*       '200':
*         description: Composer document
*       '401':
*         description: Invalid employeeId
*       '500':
*         description: Server exception
*       '501':
*         description: MongoDB Exception
*/

// FindEmployeeById API
router.get('/:id', (req, res, next) => {

  let empId = req.params.id
  empId = parseInt(empId, 10)

  //analyzing empId to ee if the employee id entered was a number.
  if(isNaN(empId)) {
      const err = new Error('Bad Request')
      err.status = 400
      console.error('empId can not be found:', err.message)
      errorLogger({filename: 'employee-routes.js', message: 'empId can not be found: ${err.message}'})
      next(err)
  } else {
      Employee.findOne({'empId': req.params.id}, function(err, emp) {
          if (err) {
              console.error('mongodb error:', err)
              errorLogger({filename: 'employee-routes.js', message: 'mongodb error: ${err.message}'})
              next(err)
          } else {
              console.log('emp:', emp)
              debugLogger({filename: 'employee-routes.js', message: emp})
              res.send(emp)
          }
      })
  }
})

/**
 * @openapi
 * /api/employees/{empId}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     name: findAllTasks
 *     description: Show all tasks by empId
 *     summary: Find all tasks by empId
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: empId for results out of MongoDB
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: All employees tasks
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Null
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// findAll Tasks
router.get('/:empId/tasks', async(req, res, next) => {

  let empId = req.params.empId
  const err = checkNum(empId)

  if (err === false) {

     try {

      // validates empId
      const emp = await Employee.findOne({'empId': empId}, 'empId todo done')

      // if statement
      if (emp) {
        console.log(emp)
        debugLogger({filename: myFile, message: emp})
        res.send(emp)

      // error handling for a null record
      } else {
        console.error(createError(404))
        errorLogger({filename: myFile, message: createError(404)})
        next(createError(404))
      }

    // Error handling for server error
    } catch (err) {
      errorLogger({filename: myFile, message: err})
      next(err)
    }

  // Error handling for invalid empId
  } else {
    const errorString = `req.params must be a number: ${empId}`
    console.error(errorString)
    errorLogger({filename: myFile, message: errorString})
    next(err)
  }
})

/**
 * @openapi
 * /api/employees/{empId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     name: createTask
 *     summary: new task creation by empId
 *     parameters:
 *        - name: empId
 *          in: path
 *          required: true
 *          description: gets results from MongoDB by empId
 *          schema:
 *            type: number
 *     requestBody:
 *       description: new task creation by empId
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Task added to MongoDB
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Null
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// createTask
router.post('/:empId/tasks', async(req, res, next) => {

  let empId = req.params.empId
  const err = checkNum(empId)

  if (err === false) {

    try{

      // validates empId
      let emp = await Employee.findOne({'empId': empId})

      // if statement
      if (emp) {
        const newTask = req.body
        const validator = ajv.compile(taskSchema)
        const valid = validator(newTask)

        // Error handling for a bad request
        if (!valid) {
          const err = Error('Bad Request')
          err.status = 400
          console.error('Bad Request. Unable to validate req.body against the defined schema')
          errorLogger({filename: myFile, message: errorString})
          next(err)

        // new task pushed to MongoDB
        } else {
          emp.todo.push(newTask)
          const result = await emp.save()
          console.log(result)
          debugLogger({filename: myFile, message: result})

          const task = result.todo.pop()

          const newTaskResponse = new BaseResponse(201, 'Task item added successfully', {id: task._id})
          res.status(201).send(newTaskResponse)
          res.status(204).send()
        }

      // Error handling for a null record
      } else {
        console.error(createError(404))
        errorLogger({filename: myFile, message: createError(404)})
        next(createError(404))
      }

    // Error handling for server error
    } catch (err) {
      next(err)
    }

  // Error handling for an invalid empId
  } else {
    console.error('req.params.empId must be a number', empId)
    errorLogger({filename: myFile, message: `req.params.empId must be a number ${empId}`})
  }
})

// Export the router
module.exports = router;
