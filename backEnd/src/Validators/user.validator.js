const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator.util");

const validatorCreateUser = [
  check("name")
  .exists()
  .notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateUser };
