const employeeController = require('../controllers/employee_strength.controller');
const { body, checkSchema } = require('express-validator');
const { validate } = require('../config/validate');
const helper = require('../config/helpers')
module.exports = (router) => {
  router.get('/employee', employeeController.getRecords);
  router.get('/employee/:empId', employeeController.getRecordsById);
  router.post('/employee', validate([
    body('number_of_employee').not().isEmpty().withMessage("This field is Required").matches(/^[ A-Za-z0-9\()\-+/<>]*$/).withMessage("Allow only alphanumeric ,(,),-,/,<,>"),
    body('status')
      .not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("first name should be char only")
      .custom((value) => {
        if (value === "Active" || value === "Inactive") {
          return Promise.resolve('valid');
        }
        else {
          return Promise.reject('Status is not valid');
        }
      }),
    body('created_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty'),
    body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty'),
  ]), employeeController.postRecords);
  router.put('/employee/:empId', validate([
    body('number_of_employee').not().isEmpty().withMessage("This field is Required").matches(/^[ A-Za-z0-9\()\-+/<>]*$/).withMessage("Allow only alphanumeric ,(,),-,/,<,>"),
    body('status').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("status should be char only")
      .custom((value) => {
        if (value === "Active" || value === "Inactive") {
          return Promise.resolve('valid');
        }
        else {
          return Promise.reject('Status is not valid');
        }
      }),
    body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty'),
  ]), employeeController.updateRecords);
  router.delete('/employee/:id', employeeController.deleteRecords);
}
