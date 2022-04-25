const sectorController = require('../controllers/sectors.controller');
const { check, validationResult, body } = require('express-validator');
const { validate } = require('../config/validate');

module.exports = (router) => {
  router.get('/sector', sectorController.getRecords);
  router.get('/sector/:sectorId', sectorController.getRecordsById);
  router.post('/sector', validate([
    body('sector_name').not().isEmpty().withMessage("This field is Required").matches(/^[ A-Za-z0-9\()\-+/<>]*$/).withMessage("Allow only alphanumeric ,(,),-,/,<,>"),
    body('status').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("status should be char only")
      .custom((value) => {
        if (value === "Active" || value === "Inactive") {
          return Promise.resolve('valid');
        }
        else {
          return Promise.reject('Status is not valid');
        }
      }),
    body('created_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Created By field."),
    body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
  ]), sectorController.postRecords);
  router.put('/sector/:sectorId', validate([
    body('sector_name').not().isEmpty().withMessage("This field is Required").matches(/^[ A-Za-z0-9\()\-+/<>]*$/).withMessage("Allow only alphanumeric ,(,),-,/,<,>"),
    body('status').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("status should be char only")
      .custom((value) => {
        if (value === "Active" || value === "Inactive") {
          return Promise.resolve('valid');
        }
        else {
          return Promise.reject('Status is not valid');
        }
      }),
    body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
  ]), sectorController.updateRecords);
  router.delete('/sector/:id', sectorController.deleteRecords);
}
