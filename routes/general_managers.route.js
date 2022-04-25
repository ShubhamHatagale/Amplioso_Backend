const generalManagers = require('../controllers/general_managers.controller');
const General_Managers = require('../models/general_managers.model');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

module.exports = (router) => {
    router.get('/company/general_managers/:userId', generalManagers.getRecords);
    router.post('/company/general_managers',
        //  validate([
        //     body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("first name should be char only"),
        //     body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("last name should be char only"),
        //     body('count').not().isEmpty().withMessage("This field is Required").isInt(),
        //     body('company_id').not().isEmpty().withMessage("This field is Required").isInt(),
        //     body('user_email').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid email.'),
        //     body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
        //     body('created_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Created By field."),
        // ]),
        generalManagers.postRecords);
    router.put('/company/general_managers/:userId',
        //  validate([
        //     body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("first name should be char only"),
        //     body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("last name should be char only"),
        //     body('count').not().isEmpty().withMessage("This field is Required").isInt(),
        //     body('company_id').not().isEmpty().withMessage("This field is Required").isInt(),
        //     body('user_email').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid email.'),
        //     body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
        //     body('created_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Created By field."),
        // ]),
        generalManagers.updateRecords);
    // router.delete('/company/managers/:id', managersController.deleteRecords);
}
