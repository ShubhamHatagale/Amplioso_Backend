const survey_feedback = require('../controllers/survey_feedback.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

const helper = require('../config/helpers')
module.exports = (router) => {
  router.get('/survey_feedback', survey_feedback.getRecords);
  router.post('/survey_feedback', survey_feedback.postRecords);
  router.put('/survey_feedback/:surveyor_id', survey_feedback.updateRecords);
  router.get('/survey_feedback/:surveyor_id', survey_feedback.getRecordById);
  router.get('/survey_feedback/company/:company_surveyor_id', survey_feedback.getRecordByCompanyId);

  // router.post('/survey_feedback/step5-7', survey_feedback.getRecordsForOptions);

  // router.post('/survey_feedback',
  // validate([
  //   body('survey_feedback_name').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("survey_feedback name should be char only").isLength({ min:2 }).withMessage("First Name must be minimum 2 characters long").isLength({max:100}).withMessage("First Name must be 2 to 100 characters long."),
  //   body('status').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("status should be char only")
  //   .custom((value) => {
  //     if (value === "Active" || value ==="Inactive") {
  //       return Promise.resolve('valid');
  //     }
  //     else{
  //       return Promise.reject('Status is not valid');
  //     }
  //   }),    
  //   body('created_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
  //   body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
  //   ]),survey_feedback.postRecords);
  // router.put('/survey_feedback/:survey_feedbackId',
  //   validate([
  //     body('survey_feedback_name').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("survey_feedback name should be char only"),
  //     body('status').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("status should be char only")
  //       .custom((value) => {
  //         if (value === "Active" || value === "Inactive") {
  //           return Promise.resolve('valid');
  //         }
  //         else {
  //           return Promise.reject('Status is not valid');
  //         }
  //       }),
  //     body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data.")
  //   ]), survey_feedback.updateRecords);
  router.delete('/survey_feedback/:id', survey_feedback.deleteRecords);
}
