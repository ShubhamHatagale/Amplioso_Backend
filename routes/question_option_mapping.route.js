const question_option_mappingController=require('../controllers/question_option_mapping.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/question_option_mapping',question_option_mappingController.getRecords);
  router.get('/question_option_mapping/:question_option_mappingId',question_option_mappingController.getRecordsById)
  router.post('/question_option_mapping',
  validate([
    body('question_option_mapping_name').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("question_option_mapping name should be char only").isLength({ min:2 }).withMessage("First Name must be minimum 2 characters long").isLength({max:100}).withMessage("First Name must be 2 to 100 characters long."),
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
    ]),question_option_mappingController.postRecords);
  router.put('/question_option_mapping/:question_option_mappingId',
  validate([
    body('question_option_mapping_name').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("question_option_mapping name should be char only"),
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
  ]), question_option_mappingController.updateRecords);
  router.delete('/question_option_mapping/:id', question_option_mappingController.deleteRecords);
}
