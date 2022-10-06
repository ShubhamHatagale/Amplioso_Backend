const Collect_feedback = require('../controllers/collect_feedback.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');
const helper = require('../config/helpers');
const multer = require('multer')
// const dest = require('../assets/images')

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
var upload = multer({ storage: storage, fileFilter: fileFilter }).single('prof_img');

module.exports = (router) => {
    
    router.get('/collect_feedback', Collect_feedback.getRecords);
    router.get('/collect_feedback/employee/:EmpId', Collect_feedback.getRecordsByEmpId);
    router.get('/collect_feedback/manager/:ManId', Collect_feedback.getRecordsByManId);
    router.get('/collect_feedback/company/:ComId', Collect_feedback.getRecordsByComId);
    router.get('/collect_feedback/:id', Collect_feedback.getRecordsById);
    router.get('/collect_feedback/email/:email_id', Collect_feedback.getRecordsByEmailId);
    router.get('/collect_feedback/check/test/getCheck', Collect_feedback.getCheck);

    router.post('/check_survey_key', Collect_feedback.check_survey_key);
    // router.post('/collect_feedback', upload, Collect_feedback.postRecords);

    router.post('/collect_feedback', upload, validate([
        body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("first name should be char only"),
        body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("last name should be char only"),
        // body('status').not().matches(/^[A-Za-z/]+$/).withMessage("Status should be char only"),
        body('recipient_role').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Role must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Role must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("Role should be char only"),
        body('user_email').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid email.'),
        body('employee_id').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Employee Id field."),
        body('manager_id').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Manager Id field."),
        body('company_id').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Comapany Id field."),
        body('role').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Role Id field.")
    ]), Collect_feedback.postRecords);


    router.put('/collect_feedback/:id', validate([
        body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("first name should be char only"),
        body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("last name should be char only"),
        // body('status').not().matches(/^[A-Za-z/]+$/).withMessage("Status should be char only"),
        body('recipient_role').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Role must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Role must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("Role should be char only"),
        body('user_email').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid email.'),
        body('employee_id').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Employee Id field."),
        body('manager_id').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Manager Id field."),
        body('company_id').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Comapany Id field."),
        body('role').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Role Id field.")
    ]), Collect_feedback.updateRecords);

    router.put('/collect_feedback/update/end_date/:id', Collect_feedback.updateEndDate);
    router.delete('/collect_feedback/:id', Collect_feedback.deleteRecords);
    router.put('/collect_feedback/manager_id/update/:id', Collect_feedback.updateManagerId);
    router.put('/collect_feedback/extend/update/:id', Collect_feedback.updateManagerId);

}
