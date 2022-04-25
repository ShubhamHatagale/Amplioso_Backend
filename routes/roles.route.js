const rolesController = require('../controllers/roles.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');
const helper = require('../config/helpers')

module.exports = (router) => {
  router.get('/role', rolesController.getRecords);
  router.get('/role/:roleId', rolesController.getRecordsById);
  router.post('/role', validate([
    body('role').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("role should be char only").isLength({ min: 2 }).withMessage("role must be minimum 2 characters long.").isLength({ max: 100 }).withMessage("role must be 100 characters long."), ,
    body('created_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Created By field."),
    body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
  ]), rolesController.postRecords);
  router.put('/role/:roleId', validate([
    body('role').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("role should be char only").isLength({ min: 2 }).withMessage("role must be minimum 2 characters long.").isLength({ max: 100 }).withMessage("role must be 100 characters long."), ,
    body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
  ]), rolesController.updateRecords);
  router.delete('/role/:id', rolesController.deleteRecords);
}
