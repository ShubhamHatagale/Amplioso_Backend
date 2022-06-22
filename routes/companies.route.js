const companyController = require('../controllers/companies.controller');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const { validate } = require('../config/validate');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './assets/images');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
});
var fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(null, false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: fileFilter }).single('company_logo');
const year = new Date().getFullYear();
console.log("Current Year " + year);
module.exports = (router) => {
  router.get('/company', companyController.getRecords);
  router.get('/company/:comId', companyController.getRecordsById);
  router.post('/company/forgot_password',
    validate([
      body('username').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid username.'),
    ]),
    companyController.forgotPassword);
  router.post('/companyAmpliosoNew',
    upload,
    validate([
      body('company_name').not().isEmpty().matches(/^[A-Za-z0-9-.]+$/).withMessage('Allow Alpha numric dash and dot and can not be empty').isLength({ min: 2 }).withMessage("Company Name must be minimum 2 characters long.").isLength({ max: 100 }).withMessage("Company Name must be 100 characters long."),
      body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("First Name must be minimum 2 characters long").withMessage("first name should be char only"),
      body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("Last Name must be minimum 2 characters long").withMessage("last name should be char only"),
      body('comapany_headquaters').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('date_of_inception').not().isEmpty().withMessage("This field is Required").isInt({ min: 1800 }).withMessage("min year of inception is 1800").isInt({ max: year }).withMessage("max year of inception is current year"),
      body('number_of_employee').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('business_sector').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('average_employee_compansation').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('feedback_frequency').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('current_package').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('username').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid username.'),
      body('created_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
    ]),
    companyController.postRecords2);


  router.post('/company',
    upload,
    validate([
      body('company_name').not().isEmpty().matches(/^[A-Za-z0-9-.]+$/).withMessage('Allow Alpha numric dash and dot and can not be empty').isLength({ min: 2 }).withMessage("Company Name must be minimum 2 characters long.").isLength({ max: 100 }).withMessage("Company Name must be 100 characters long."),
      body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("First Name must be minimum 2 characters long").withMessage("first name should be char only"),
      body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("Last Name must be minimum 2 characters long").withMessage("last name should be char only"),
      body('comapany_headquaters').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('date_of_inception').not().isEmpty().withMessage("This field is Required").isInt({ min: 1800 }).withMessage("min year of inception is 1800").isInt({ max: year }).withMessage("max year of inception is current year"),
      body('number_of_employee').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('business_sector').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('average_employee_compansation').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('feedback_frequency').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('current_package').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('username').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid username.'),
      body('created_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
    ]),
    companyController.postRecords);






  router.put('/company/:comId',
    upload,
    validate([
      body('company_name').not().isEmpty().withMessage("This field is Required").matches(/^[A-Za-z0-9-. ]+$/).withMessage('Allow Alpha numric dash and dot ').isLength({ min: 2 }).withMessage("Company Name must be minimum 2 characters long.").isLength({ max: 100 }).withMessage("Company Name must be 100 characters long."),
      body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("First Name must be minimum 2 characters long").withMessage("first name should be char only"),
      body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("Last Name must be minimum 2 characters long").withMessage("last name should be char only"),
      body('comapany_headquaters').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('date_of_inception').not().isEmpty().withMessage("This field is Required").isInt({ min: 1800 }).withMessage("min year of inception is 1800").isInt({ max: year }).withMessage("max year of inception is current year"), ,
      body('number_of_employee').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('business_sector').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('average_employee_compansation').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('feedback_frequency').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('current_package').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('username').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid username.'),
      body('updated_by').isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
    ]),
    companyController.updateRecords);
  router.delete('/company/:id', companyController.deleteRecords);
  router.put('/company/resetpassword/:id', companyController.postResetpassword);
}
