const managersController = require('../controllers/managers.controller');
const Managers = require('../models/managers.model');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

module.exports = (router) => {
    router.get('/allmanagers', managersController.getAllManagersRecords); 
    router.get('/company/all_users/:comId', managersController.getusersRecords);
    router.get('/company/managers/:comId', managersController.getRecords); 
    router.get('/company/managers/data/allData', managersController.getAllRecords);

    router.get('/company/managers/id/:userId', managersController.getRecordsById);
    router.post('/company/managers/forgot_password',
        validate([
            body('user_email').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid username.'),
        ]),
        managersController.forgotPassword);
    router.post('/company/managers', validate([
        body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("first name should be char only"),
        body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("last name should be char only"),
        body('count').not().isEmpty().withMessage("This field is Required").isInt(),
        body('company_id').not().isEmpty().withMessage("This field is Required").isInt(),
        body('user_email').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid email.'),
        body('role').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
        body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
        body('created_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Created By field."),
    ]), managersController.postRecords);
    router.put('/company/managers/:userId', validate([
        body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("first name should be char only"),
        body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("last name should be char only"),
        body('count').not().isEmpty().withMessage("This field is Required").isInt(),
        body('company_id').not().isEmpty().withMessage("This field is Required").isInt(),
        body('user_email').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid email.'),
        body('role').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
        body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
        body('created_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Created By field."),
    ]), managersController.updateRecords);
    router.delete('/company/managers/:id', managersController.deleteRecords);
    router.put('/company/managers/resetpassword/:id', managersController.postResetpassword);
}
