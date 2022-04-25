const YOEController = require('../controllers/year_of_experience.controller');
// const { body } = require('express-validator');
const { check, validationResult, body } = require('express-validator');
const { validate } = require('../config/validate');

module.exports = (router) => {
    router.get('/year_of_experience', YOEController.getRecords);
    router.get('/year_of_experience/:YOEId', YOEController.getRecordsById);
    router.post('/year_of_experience', validate([
        body('year_of_experience').not().isEmpty().withMessage("This field is Required").matches(/^[ A-Za-z0-9\()\-+/<>]*$/).withMessage("Allow only alphanumeric ,(,),-,/,<,>"),
        body('status').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("status should be char only")
            .custom((value) => {
                if (value === "Active" || value === "Inactive") {
                    return Promise.resolve('valid');
                }
                else {
                    return Promise.reject('Status is not valid');
                }
            }),
        body('created_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Created By field."),
        body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
    ]), YOEController.postRecords);
    router.put('/year_of_experience/:YOEId', validate([
        body('year_of_experience').not().isEmpty().withMessage("This field is Required").matches(/^[ A-Za-z0-9\()\-+/<>]*$/).withMessage("Allow only alphanumeric ,(,),-,/,<,>"),
        body('status').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("status should be char only")
            .custom((value) => {
                if (value === "Active" || value === "Inactive") {
                    return Promise.resolve('valid');
                }
                else {
                    return Promise.reject('Status is not valid');
                }
            }),
        body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().withMessage('Should be Int and can not be empty').matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
    ]), YOEController.updateRecords);
    router.delete('/year_of_experience/:id', YOEController.deleteRecords);
}
