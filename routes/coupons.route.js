const couponsController=require('../controllers/coupons.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

module.exports=(router)=>{
  router.get('/coupon',couponsController.getRecords);
  router.get('/coupon/:couponId',couponsController.getRecordsById)

  router.post('/coupon',validate([
    body('coupon_name')
    .not().isEmpty().withMessage("This field is Required").matches(/^[A-Za-z0-9-]+$/).withMessage('Allow Only Alpha numric dash  and can not be empty').isLength({min:2}).withMessage("Coupon Name must be minimum 2 characters long.").isLength({max:100}).withMessage("Coupon Name must be 100 characters long."),        
      body('coupon_percentage')
      .trim()       
      .isInt({ min: 1, max: 100 })
      .withMessage('Only Numbers are allowed upto 100'),
      body('package').not().isEmpty().withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("Pacakge should be char only"),
      body('start_date').not().isEmpty().withMessage("This field is Required").isDate(),
      body('end_date').not().isEmpty().withMessage("This field is Required").isDate(),
      body('created_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data."),
      ]),couponsController.postRecords);
  router.put('/coupon/:couponId',validate([
    body('coupon_name')
    .not().isEmpty().withMessage("This field is Required").matches(/^[A-Za-z0-9-]+$/).withMessage('Allow Only Alpha numric dash  and can not be empty').isLength({min:2}).withMessage("Coupon Name must be minimum 2 characters long.").isLength({max:100}).withMessage("Coupon Name must be 100 characters long."),         
      body('coupon_percentage')
      .trim()       
      .isInt({ min: 1, max: 100 })
      .withMessage('Only Numbers are allowed upto 100'),
      body('package').not().isEmpty().withMessage("This field is Required").withMessage("This field is Required").isString().matches(/^[A-Za-z/ ]+$/).withMessage("Pacakge should be char only"),,
      body('start_date').not().isEmpty().withMessage("This field is Required").isDate(),
      body('end_date').not().isEmpty().withMessage("This field is Required").isDate(),
      body('updated_by').not().isEmpty().withMessage("This field is Required").isInt().matches(/^[0-9/]+$/).withMessage("Enter valid data.")
      ]), couponsController.updateRecords);
  router.delete('/coupon/:id', couponsController.deleteRecords);
}
