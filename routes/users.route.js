const usersController = require('../controllers/users.controller');
const User = require('../models/users.model');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

module.exports = (router) => {
  router.get('/users', usersController.getRecords);
  router.get('/users/getRole', usersController.getRecordsbyRole);
  router.get('/users/:userId', usersController.getRecordsById);
  router.post('/users', validate([
    body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("first name should be char only"),
    body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("last name should be char only"),
    // body('date').not().isEmpty().withMessage("This field is Required").isDate(),
    // body('date_of_joining').not().isEmpty().withMessage("This field is Required").isDate(),
    // body('designation').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/]+$/).withMessage("designation should be char only"),,
    // body('role').not().isEmpty().withMessage("This field is Required").isInt(),
    // body('company_id').not().isEmpty().withMessage("This field is Required").isInt(),
    body('mobile_no').not().isEmpty().withMessage("This field is Required").isLength({ max: 10 }).withMessage("mobile_no should be 10 digit long").matches(/^[0-9/]+$/).withMessage("Invalid mobile_no."),
    body('user_email').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid email.'),
    body('username').custom(value => {
      return User.findByPk(value).then(user => {
        if (user) {
          return Promise.reject('Username already in use');
        }
      });
    }),
    body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Updated By field."),
    body('created_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid Created By field."),
  ]), usersController.postRecords);
  router.put('/users/:userId', validate([
    body('first_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("First Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("First Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("First Name must be minimum 2 characters long").withMessage("first name should be char only"),
    body('last_name').not().isEmpty().withMessage("This field is Required").isString().isLength({ min: 2 }).withMessage("Last Name must be minimum 2 characters long").isLength({ max: 15 }).withMessage("Last Name must be 2 to 15 characters long.").matches(/^[A-Za-z/]+$/).withMessage("Last Name must be minimum 2 characters long").withMessage("last name should be char only"),
    // body('date').not().isEmpty().withMessage("This field is Required").isDate(),
    // body('date_of_joining').not().isEmpty().withMessage("This field is Required").isDate(),
    // body('designation').not().isEmpty().withMessage("This field is Required").isString(),
    // body('role').not().isEmpty().withMessage("This field is Required").isInt(),
    // body('company_id').not().isEmpty().withMessage("This field is Required").isInt(),
    body('mobile_no').not().isEmpty().withMessage("This field is Required").isLength({ max: 10 }).withMessage("mobile_no should be 10 digit long").matches(/^[0-9/]+$/).withMessage("Invalid mobile_no."),
    body('user_email').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid email.'),
    body('username')
      .custom(value => {
        return User.findByPk(value).then(user => {
          if (user) {
            return Promise.reject('Username already in use');
          }
        });
      }),
    body('updated_by').not().isEmpty().isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
  ]), usersController.updateRecords);
  router.post('/users/forgot-password',
    validate([
      body('username').not().isEmpty().withMessage("This field is Required").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).withMessage('Please enter a valid username.'),
    ]),
    usersController.forgotPassword);
  router.delete('/users/:id', usersController.deleteRecords);
}
