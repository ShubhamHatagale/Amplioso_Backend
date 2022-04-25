const checktestController=require('../controllers/checktest.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/checktest',checktestController.getRecords);
  router.get('/checktest/:checktestId',checktestController.getRecordsById)
  router.post('/checktest',
  validate([
    body('checktest_name').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("checktest name should be char only").isLength({ min:2 }).withMessage("First Name must be minimum 2 characters long").isLength({max:100}).withMessage("First Name must be 2 to 100 characters long."),
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
    ]),checktestController.postRecords);
  router.put('/checktest/:checktestId',
  validate([
    body('checktest_name').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("checktest name should be char only"),
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
  ]), checktestController.updateRecords);
  router.delete('/checktest/:id', checktestController.deleteRecords);
}
