const Collect_feedback = require('../controllers/collect_feedback.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');
const helper = require('../config/helpers');

module.exports = (router) => {
    router.get('/collect_feedback/employee/:EmpId', Collect_feedback.getRecordsByEmpId);
    router.get('/collect_feedback/company/:ComId', Collect_feedback.getRecordsByComId);
    router.get('/collect_feedback/:id', Collect_feedback.getRecordsById);
    router.post('/check_survey_key', Collect_feedback.check_survey_key);

    router.post('/collect_feedback', validate([
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
    router.delete('/collect_feedback/:id', Collect_feedback.deleteRecords);
}
