/*
============================================
; Title: employee-routes.js
; Author: Professor Krasso
: Modified by: Chad ONeal
; Date: 03/25/2023
; Description: employee-routes.js for nodebucket
============================================
*/

// require statements
const express = require('express');
const Employee = require ('../models/employee');
const router = express.Router();
const { debugLogger, errorLogger } = require('../logs/logger');
const createError = require('http-errors');
const Ajv = require('ajv')
const BaseResponse = require('../models/base-response');

// logging and validation
const myFile = 'employee-route.js';
const ajv = new Ajv()

// function to determine empId is a number
const checkNum = (id) => {
  id = parseInt(id, 10)
  if (isNaN(id)) {
    // 400 bad request
    const err = new Error('Bad Request')
    err.status = 400
    console.error('id could not be parsed: ', id)
    errorLogger({filename: myFile, message: `id could note be parsed: ${id}`})
    return err
  } else {
    return false
  }
}

// validation schema
const taskSchema = {
  type: 'object',
  properties: {
    text: {type: 'string'}
  },
  required: ['text'],
  additionalProperties: false
}

// validation schema
const tasksSchema = {
  type: 'object',
  required: ['todo', 'done',],
  additionalProperties: false,
  properties: {
    todo: {
      type: 'array',
      additionalProperties: false,
      items: taskSchema
    },
    done: {
      type: 'array',
      additionalProperties: false,
      items: taskSchema
    },
  }
}

// getTasks function
function getTask(id, tasks) {
  const task = tasks.find(item => item._id.toString() === id)
  return task
}

/**
* findEmployeeById
* @openapi
* /api/employees/{id}:
*   get:
*     tags:
*       - Employees
*     description:  Returns employee by empId
*     summary: findEmployeeById
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: Employee ID
*         schema:
*           type: number
*     responses:
*       '200':
*         description: Employee by empId
*       '401':
*         description: Invalid empId
*       '500':
*         description: Server exception
*       '501':
*         description: MongoDB Exception
*/

// findEmployeeById
router.get('/:id', (req, res, next) => {

  let empId = req.params.id
  empId = parseInt(empId, 10)

  // analyzing empId to see if number.
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
 * findAllTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     description: Find tasks by empId
 *     summary: findAllTasks
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: empId
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Tasks by empId
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Null Record
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// findAllTasks
router.get('/:empId/tasks', async(req, res, next) => {

  let empId = req.params.empId
  const err = checkNum(empId)

  if (err === false) {

    // try catch block
    try {

      // attempts to retrieve the empId from mongoDB
      const emp = await Employee.findOne({'empId': empId}, 'empId todo done doing')

      // returns query
      if (emp) {
        console.log(emp)
        debugLogger({filename: myFile, message: emp})
        res.send(emp)

      // null record
      } else {
        console.error(createError(404))
        errorLogger({filename: myFile, message: createError(404)})
        next(createError(404))
      }

    // server error handling
    } catch (err) {
      errorLogger({filename: myFile, message: err})
      next(err)

    }
  // invalid empId error
  } else {
    const errorString = `req.params must be a number: ${empId}`
    console.error(errorString)
    errorLogger({filename: myFile, message: errorString})
    next(err)
  }
})


/**
 * createTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     description: Creates a new task by empId
 *     summary: createTask
 *     parameters:
 *        - name: empId
 *          in: path
 *          required: true
 *          description: Create task by empId
 *          schema:
 *            type: number
 *     requestBody:
 *       description: Creates a new task by empId
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
 *         description: New task added to MongoDB
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Null Record
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

    // try catch block
    try{

      // attempts to retrieve the empId from mongoDB
      let emp = await Employee.findOne({'empId': empId})

      // returns query
      if (emp) {
        const newTask = req.body
        const validator = ajv.compile(taskSchema)
        const valid = validator(newTask)

        // 400 error handling
        if (!valid) {
          const err = Error('Bad Request')
          err.status = 400
          console.error('Bad Request. Unable to validate req.body against the defined schema')
          errorLogger({filename: myFile, message: errorString})
          next(err)

        // creates new task in mongoDB
        } else {
          emp.todo.push(newTask)
          const result = await emp.save()
          console.log(result)
          debugLogger({filename: myFile, message: result})
          // Response to Client
          const task = result.todo.pop()
          const newTaskResponse = new BaseResponse(201, 'Task item added successfully', {id: task._id})
          res.status(201).send(newTaskResponse)
        }

      // null record
      } else {
        console.error(createError(404))
        errorLogger({filename: myFile, message: createError(404)})
        next(createError(404))
      }

    // server error handling
    } catch (err) {
      next(err)
    }

  // invalid empId error
  } else {
    console.error('req.params.empId must be a number', empId)
    errorLogger({filename: myFile, message: `req.params.empId must be a number ${empId}`})
  }
})


/**
 * updateTask
 * @openapi
 *
 * /api/employees/{empId}/tasks:
 *   put:
 *     tags:
 *       - Employees
 *     description: Updates tasks by empId
 *     summary: updateTask
 *     operationId: updateTasks
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       description: Tasks array for employee
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - todo
 *               - done
 *               - doing
 *             properties:
 *               todo:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               done:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *     responses:
 *       '201':
 *         description: Tasks updated in MongoDB
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Null Record
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// updateTasks
router.put('/:empId/tasks', async(req, res, next) => {

  let empId = req.params.empId
  const err = checkNum(empId)

  // attempts to retrieve the empId from mongoDB
  if (err === false) {

    // try catch block
    try {
      let emp = await Employee.findOne({'empId': empId})

      // 404 error
      if (!emp) {
        console.error(createError(404))
        errorLogger({filename: myFile, message: createError(404)})
        next(createError(404))
        return
      }

      // validation
      const tasks = req.body
      const validator = ajv.compile(tasksSchema)
      const valid = validator(tasks)

      // 400 error
      if (!valid) {
        const err = Error('Bad Request')
        err.status = 400
        console.log('Bad Request. Unable to validate req.body schema against tasksSchema')
        errorLogger({filename: myFile, message: `Bad Request. Unable to verify req.body schema against tasksSchema`})
        next(err)
        return
      }

      emp.set({
        todo: req.body.todo,
        done: req.body.done,
      })
      const result = await emp.save()
      console.log(result)
      debugLogger({filename: myFile, message: result})
      const task = result.todo.pop()
          const newTaskResponse = new BaseResponse(201, 'Task item updated successfully', {id: task._id})
          res.status(201).send(newTaskResponse)


    // server error
    } catch (err) {
      next(err)
    }
  }
})

/**
 * deleteTask
 * @openapi
 * /api/employees/{empId}/tasks/{taskId}:
 *   delete:
 *     tags:
 *       - Employees
 *     description: Deletes task by empId
 *     summary: deleteTask
 *     operationId: deleteTask
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         scheme:
 *           type: number
 *       - name: taskId
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *     responses:
 *       '201':
 *         description: Tasks Updated
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Null Record
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// deleteTask
router.delete('/:empId/tasks/:taskId', async(req, res, next) => {

  let taskId = req.params.taskId
  let empId = req.params.empId

  const err = checkNum(empId)

  // attempts to retrieve the empId from mongoDB
  if (err === false) {

    // try catch block
    try {
      let emp = await( Employee.findOne({'empId': empId}))

      // 404 error
      if (!emp) {
        console.error(createError(404))
        errorLogger({filename: myFile, message: createError(404)})
        next(createError(404))
        return
      }
      const todoTask = getTask(taskId, emp.todo)
      const doneTask = getTask(taskId, emp.done)


      // deletes tasks
      if (todoTask !== undefined) {
        emp.todo.id(todoTask._id).remove()
      }
      if (doneTask !== undefined) {
        emp.done.id(doneTask._id).remove()
      }

      // 404 error
      if (todoTask === undefined && doneTask === undefined) {
        const err = Error('Not Found')
        err.status = 404
        console.error('TaskId not Found',  taskId)
        errorLogger({filename: myFile, message: `TaskId not found ${taskId}`})
        next(err)
        return
      }

      // task deleted successfully
      const result = await emp.save()
      debugLogger({filename: myFile, message: result})
      const task = result.todo.pop()
          const newTaskResponse = new BaseResponse(201, 'Task item deleted successfully', {id: task._id})
          res.status(201).send(newTaskResponse)


    // server error handling
    } catch (err) {
      next(err)
    }
  }
})

// Export statement
module.exports = router;