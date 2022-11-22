const Employee = require('../controllers/employee.controller');
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
    router.get('/employeedetails', Employee.getRecords);
    router.get('/employeedetails/manager/:managerId', Employee.getRecordsByManagerId);
    router.get('/employeedetails/company/:ComId', Employee.getRecordsByCompanyId);
    router.get('/employeedetails/:id', Employee.getRecordsById);
    router.get('/employeedetails/email/:EmailId', Employee.getRecordsByEmailId);

    router.post('/employeedetails',upload,
        // validate([
        //     body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("first name should be char only"),
        //     body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("last name should be char only"),
        //     body('user_email').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid email.'),
        //     body('gender').not().isEmpty().withMessage("This field is Required").isString(),
        //     // body('status').not().matches(/^[A-Za-z/]+$/).withMessage("Status should be char only"),
        //     body('role').not().isEmpty().withMessage("This field is Required").isInt(),
        //     body('company_id').not().isEmpty().withMessage("This field is Required").isInt(),
        //     body('manager_id').not().isEmpty().withMessage("This field is Required").isInt(),
        //     body('feedback_frequency').not().isEmpty().withMessage("This field is Required").isInt(),
        //     body('feedback_year').not().isEmpty().withMessage("This field is Required").isInt(),
        //     body('feedback_month').not().isEmpty().withMessage("This field is Required").isInt(),
        //     body('best_classified').not().isEmpty().withMessage("This field is Required").isString(),
        //     body('service_external_client').not().isEmpty().withMessage("This field is Required").isString(),
        //     body('location').not().isEmpty().withMessage("This field is Required").isInt(),
        //     body('working_presence').not().isEmpty().withMessage("This field is Required").isInt(),
        //     body('year_of_experience').not().isEmpty().withMessage("This field is Required").isInt(),
        // ]), 
        
        Employee.postRecords);

    router.put('/employeedetails/:id',upload, 
    // validate([
        // body('first_name').not().isEmpty().withMessage("This first_name is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("first name should be char only"),
        // body('last_name').not().isEmpty().withMessage("This last_name is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("last name should be char only"),
        // body('user_email').not().isEmpty().withMessage("This user_email is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid email.'),
        // body('gender').not().isEmpty().withMessage("This gender is Required").isString(),
        // // body('status').not().matches(/^[A-Za-z/]+$/).withMessage("Status should be char only"),
        // body('role').not().isEmpty().withMessage("This role is Required").isInt(),
        // body('company_id').not().isEmpty().withMessage("This company_id is Required").isInt(),
        // body('manager_id').not().isEmpty().withMessage("This manager_id is Required").isInt(),
        // body('feedback_frequency').not().isEmpty().withMessage("This feedback_frequency is Required").isInt(),
        // body('feedback_year').not().isEmpty().withMessage("This feedback_year is Required").isInt(),
        // body('feedback_month').not().isEmpty().withMessage("This feedback_month is Required").isInt(),
        // body('best_classified').not().isEmpty().withMessage("This best_classified is Required").isString(),
        // body('service_external_client').not().isEmpty().withMessage("This service_external_client is Required").isString(),
        // body('location').not().isEmpty().withMessage("This location is Required").isInt(),
        // body('working_presence').not().isEmpty().withMessage("This working_presence is Required").isInt(),
        // body('year_of_experience').not().isEmpty().withMessage("This year_of_experience is Required").isInt(),
    // ])
    Employee.updateRecords);

    router.put('/employeedetails/manager_id/update/:id', Employee.updateManagerId);
    router.put('/employeedetails/manager_id/updateprofile_img/:id',upload, Employee.updateprofile_img);

    router.delete('/employeedetails/:id', Employee.deleteRecords);

}
