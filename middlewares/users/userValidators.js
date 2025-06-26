const { check, validatoionResult } = require("express-validator");

const addUsersValidators = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  check("email").isEmail().withMessage("Please provide a valid email address"),
];

const addUserValidationHandler = function(req,res,next){}

module.exports = {
  addUsersValidators,
};
