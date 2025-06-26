const { check, validatoionResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

const addUsersValidators = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  check("email").isEmail().withMessage("Please provide a valid email address"),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if ((req.files, length > 0)) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `../../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        }
      );
    }

    res.send(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUsersValidators,
};
