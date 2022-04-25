const packageController = require('../controllers/package.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');
const helper = require('../config/helpers')
module.exports = (router) => {
  router.get('/package', packageController.getRecords);
  router.get('/package/:packId', packageController.getRecordsById)
  router.post('/package',
    validate([
      body('package_name').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z0-9-+/ ]+$/).withMessage("Incorrect Package name"),
      body('no_of_employees').not().isEmpty().withMessage("This field is Required").matches(/^[0-9+.-]+$/).withMessage('allow only number and dash'),
      body('actual_price').not().isEmpty().withMessage("This field is Required").matches(/^[ A-Za-z0-9\$,-]*$/).withMessage('Allow only alphanumeric,doller,comma and dash'),
      body('price').not().isEmpty().withMessage("This field is Required").matches(/^[ A-Za-z0-9\$,-]*$/).withMessage('Allow only alphanumeric,doller,comma and dash'),
      // body('start_date').not().isEmpty().withMessage("This field is Required").isDate(),
      // body('end_date').not().isEmpty().withMessage("This field is Required").isDate(),
      body('created_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Created By field."),
      body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
    ]),
    packageController.postRecords);
  router.put('/package/:packId',
    validate([
      body('package_name').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z0-9-+/ ]+$/).withMessage("Incorrect Package name"),
      body('no_of_employees').not().isEmpty().withMessage("This field is Required").matches(/^[0-9+.-]+$/).withMessage('allow only number and dash'),
      body('actual_price').not().isEmpty().withMessage("This field is Required").matches(/^[ A-Za-z0-9\$,-]*$/).withMessage('Allow only alphanumeric,doller,comma and dash'),
      body('price').not().isEmpty().withMessage("This field is Required").matches(/^[ A-Za-z0-9\$,-]*$/).withMessage('Allow only alphanumeric,doller,comma and dash'),
      // body('start_date').not().isEmpty().withMessage("This field is Required").isDate(),
      // body('end_date').not().isEmpty().withMessage("This field is Required").isDate(),
      body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
    ]),
    packageController.updateRecords);
  router.delete('/package/:id', packageController.deleteRecords);
}
