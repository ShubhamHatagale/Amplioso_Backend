const { validationResult } = require('express-validator');


exports.validate = validations => {
    return async (req, res, next) => {
        if (req.fileValidationError) {
            return res.send({error:req.fileValidationError});
        }        
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.send({errors: errors.array()})
    };
};