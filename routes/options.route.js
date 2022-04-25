const optionController = require('../controllers/options.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

module.exports = (router) => {
    router.get('/option', optionController.getRecords);
    router.get('/option/:Q_id', optionController.getRecordsById);
    router.get('/option/opt/:Question_id', optionController.getRecordsByQuestionId);
    router.get('/option/opt/unfav/:Question_id', optionController.getRecordsByQuestionIdunfavourable);

    router.post('/option', validate([
        body('question_id').not().isEmpty().withMessage("This field is Required").isInt(),
        body('option').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Option must be minimum 2 characters long")
    ]), optionController.postRecords);
    router.put('/option/:id', validate([
        body('question_id').not().isEmpty().withMessage("This field is Required").isInt(),
        body('option').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Option must be minimum 2 characters long")
    ]), optionController.updateRecords);
    router.delete('/option/:id', optionController.deleteRecords);
}
