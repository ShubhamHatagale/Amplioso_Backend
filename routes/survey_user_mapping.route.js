const survey_user_mapping=require('../controllers/survey_user_mapping.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/survey_user_mapping',survey_user_mapping.getRecords);
  router.get('/survey_user_mapping/:survey_user_mappingId',survey_user_mapping.getRecordsById)
  router.post('/survey_user_mapping',
  validate([
    body('survey_user_mapping_name').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("survey_user_mapping name should be char only").isLength({ min:2 }).withMessage("First Name must be minimum 2 characters long").isLength({max:100}).withMessage("First Name must be 2 to 100 characters long."),
    body('status').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("status should be char only")
    .custom((value) => {
      if (value === "Active" || value ==="Inactive") {
        return Promise.resolve('valid');
      }
      else{
        return Promise.reject('Status is not valid');
      }
    }),    
    body('created_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
    body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
    ]),survey_user_mapping.postRecords);
  router.put('/survey_user_mapping/:survey_user_mappingId',
  validate([
    body('survey_user_mapping_name').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("survey_user_mapping name should be char only"),
    body('status').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("status should be char only")
    .custom((value) => {
      if (value === "Active" || value ==="Inactive") {
        return Promise.resolve('valid');
      }
      else{
        return Promise.reject('Status is not valid');
      }
    }),    
    body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data.")
  ]), survey_user_mapping.updateRecords);
  router.delete('/survey_user_mapping/:id', survey_user_mapping.deleteRecords);
}
