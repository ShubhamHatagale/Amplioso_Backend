const feedbackController = require('../controllers/feedback_frequencies.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

const helper = require('../config/helpers')
module.exports = (router) => {
  router.get('/feedback', feedbackController.getRecords);
  router.get('/feedback/:feedId', feedbackController.getRecordsById);
  router.post('/feedback', validate([
    body('feedback_frequencies').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z-/]+$/).withMessage("should be char and dash only").isLength({ min: 2 }).withMessage("Feedback  must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Feedback must be 2 to 15 characters long."),
    body('feedback_rounds').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
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
  ]), feedbackController.postRecords);
  router.put('/feedback/:feedId',
    validate([
      body('feedback_frequencies').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z-/]+$/).withMessage("should be char and dash only").isLength({ min: 2 }).withMessage("Feedback  must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Feedback must be 2 to 15 characters long."),
      body('feedback_rounds').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
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
      body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
    ]), feedbackController.updateRecords);
  router.delete('/feedback/:id', feedbackController.deleteRecords);
}
