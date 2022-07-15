const Employee = require('../controllers/employee.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');
const helper = require('../config/helpers');

module.exports = (router) => {
    router.get('/employeedetails/manager/:managerId', Employee.getRecordsByManagerId);
    router.get('/employeedetails/company/:ComId', Employee.getRecordsByCompanyId); 
    router.get('/employeedetails/:id', Employee.getRecordsById); 
    router.get('/employeedetails/email/:EmailId', Employee.getRecordsByEmailId);

    router.post('/employeedetails', validate([
        body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("first name should be char only"),
        body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("last name should be char only"),
        body('user_email').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid email.'),
        body('gender').not().isEmpty().withMessage("This field is Required").isString(),
        // body('status').not().matches(/^[A-Za-z/]+$/).withMessage("Status should be char only"),
        body('role').not().isEmpty().withMessage("This field is Required").isInt(),
        body('company_id').not().isEmpty().withMessage("This field is Required").isInt(),
        body('manager_id').not().isEmpty().withMessage("This field is Required").isInt(),
        body('feedback_frequency').not().isEmpty().withMessage("This field is Required").isInt(),
        body('feedback_year').not().isEmpty().withMessage("This field is Required").isInt(),
        body('feedback_month').not().isEmpty().withMessage("This field is Required").isInt(),
        body('best_classified').not().isEmpty().withMessage("This field is Required").isString(),
        body('service_external_client').not().isEmpty().withMessage("This field is Required").isString(),
        body('location').not().isEmpty().withMessage("This field is Required").isInt(),
        body('working_presence').not().isEmpty().withMessage("This field is Required").isInt(),
        body('year_of_experience').not().isEmpty().withMessage("This field is Required").isInt(),
    ]), Employee.postRecords);
    router.put('/employeedetails/:id', validate([
        body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("first name should be char only"),
        body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("last name should be char only"),
        body('user_email').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid email.'),
        body('gender').not().isEmpty().withMessage("This field is Required").isString(),
        // body('status').not().matches(/^[A-Za-z/]+$/).withMessage("Status should be char only"),
        body('role').not().isEmpty().withMessage("This field is Required").isInt(),
        body('company_id').not().isEmpty().withMessage("This field is Required").isInt(),
        body('manager_id').not().isEmpty().withMessage("This field is Required").isInt(),
        body('feedback_frequency').not().isEmpty().withMessage("This field is Required").isInt(),
        body('feedback_year').not().isEmpty().withMessage("This field is Required").isInt(),
        body('feedback_month').not().isEmpty().withMessage("This field is Required").isInt(),
        body('best_classified').not().isEmpty().withMessage("This field is Required").isString(),
        body('service_external_client').not().isEmpty().withMessage("This field is Required").isString(),
        body('location').not().isEmpty().withMessage("This field is Required").isInt(),
        body('working_presence').not().isEmpty().withMessage("This field is Required").isInt(),
        body('year_of_experience').not().isEmpty().withMessage("This field is Required").isInt(),
    ]), Employee.updateRecords);
    router.delete('/employeedetails/:id', Employee.deleteRecords);
}
