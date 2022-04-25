const QuestionController = require('../controllers/questions.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

module.exports = (router) => {
    router.get('/question', QuestionController.getRecords);
    router.get('/question/:Q_id', QuestionController.getRecordsById);
    router.get('/question/company/:ComId', QuestionController.getRecordsByComId);
    router.get('/question/q_type/:Qtype', QuestionController.getRecordsByQueType);

    router.post('/question', validate([
        body('company_id').not().isEmpty().withMessage("This field is Required").isInt(),
        body('question_type').not().isEmpty().withMessage("This field is Required").isInt(),
        body('question').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 5 }).withMessage("Question must be minimum 5 characters long").matches(/^[ A-Za-z0-9\$?,-]*$/).withMessage('Allow only alphanumeric,question,comma and dash')
    ]), QuestionController.postRecords);
    router.put('/question/:Q_id', validate([
        body('company_id').not().isEmpty().withMessage("This field is Required").isInt(),
        body('question_type').not().isEmpty().withMessage("This field is Required").isInt(),
        body('question').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 5 }).withMessage("Question must be minimum 5 characters long")
    ]), QuestionController.updateRecords);
    router.delete('/question/:id', QuestionController.deleteRecords);
}
