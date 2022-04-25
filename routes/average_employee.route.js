const averageempController = require('../controllers/average_employee.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');


module.exports = (router) => {
  router.get('/averageEmp', averageempController.getRecords);
  router.get('/averageEmp/:AverageId', averageempController.getRecordsById);
  router.post('/averageEmp',
    validate([
      body('average_employees').not().isEmpty().withMessage("This field is Required").matches(/^[ A-Za-z0-9\$,-]*$/).withMessage('Allow only alphanumeric,doller,comma and dash'),
      body('status').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("status should be char only")
        .custom((value) => {
          if (value === "Active" || value === "Inactive") {
            return Promise.resolve('valid');
          }
          else {
            return Promise.reject('Status is not valid');
          }
        }),
      body('created_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data.")
    ])
    , averageempController.postRecords);
  router.put('/averageEmp/:averageEmpId',
    validate([
      body('average_employees').not().isEmpty().withMessage("This field is Required").matches(/^[ A-Za-z0-9\$,-]*$/).withMessage('Allow only alphanumeric,doller,comma and dash'),
      body('status').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("status should be char only")
        .custom((value) => {
          if (value === "Active" || value === "Inactive") {
            return Promise.resolve('valid');
          }
          else {
            return Promise.reject('Status is not valid');
          }
        }),
      body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data.")
    ])
    , averageempController.updateRecords);
  router.delete('/averageEmp/:id', averageempController.deleteRecords);
}
