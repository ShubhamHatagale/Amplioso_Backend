const survey_answers = require('../controllers/survey_answers.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

const helper = require('../config/helpers')
module.exports = (router) => {
  router.get('/survey_answers', survey_answers.getRecords);
  router.get('/survey_answers/:survey_answersId', survey_answers.getRecordsById);
  router.post('/survey_answers_same', survey_answers.getRecordsByOptionUser);
  router.post('/survey_filteredAnswer', survey_answers.getFilteredAnswer);
  router.post('/survey_question_option_mapped_ans', survey_answers.getquestionOptionAnswers);
  router.post('/survey_report_data', survey_answers.getReportData);

  router.post('/survey_answers', survey_answers.postRecordsStep1);
  router.put('/survey_answers/:id', survey_answers.updateRecords);

  // router.post('/survey_answers',
  // validate([
  //   body('survey_answers_name').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("survey_answers name should be char only").isLength({ min:2 }).withMessage("First Name must be minimum 2 characters long").isLength({max:100}).withMessage("First Name must be 2 to 100 characters long."),
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
  //   ]),survey_answers.postRecords);
  router.put('/survey_answers/:survey_answersId',
    validate([
      body('survey_answers_name').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("survey_answers name should be char only"),
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
    ]), survey_answers.updateRecords);
  router.delete('/survey_answers/:id', survey_answers.deleteRecords);
}
