const cdb = require("../config/conexion");
const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator.util");
const calculateAge = require("../utils/handleCalculateAge");

const validatorRegister = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("lastName").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("userName").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("bornDay")
    .exists()
    .notEmpty()
    .isDate({ delimiters: ["/", "-"] })
    .withMessage("no es un formato permitido de fecha")
    .isBefore(Date(), { delimiters: ["/", "-"] })
    .withMessage("la fecha de nacimiento no puede ser mayor a la fecha actual")
    .custom((value) => {
      let edad = calculateAge(value);
      if (edad < 18) {
        return Promise.reject("Menor de edad");
      }
      return true;
    })
    .withMessage({ message: "Debe ser mayor de edad" }),
  check("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
    .withMessage("La contrasenia no cumple con los qrequisitos minimos"),
  check("email")
    .exists()
    .notEmpty()
    .isEmail()
    .custom(async(email) => {

      let sql = "SELECT UsuarioId FROM `Usuarios` WHERE correo='" + email +"'";

      try {
        let findEmail = (await cdb.query(sql))[0];
        if (findEmail) {
          return Promise.reject("El email ya fue registrado");
        }
      } catch (error) {
        return Promise.reject(error);
      }

      return true;
    }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLogin = [
  check("password")
    .isString()
    .isLength({ min: 8 })
    .not()
    .isLowercase()
    .not()
    .isUppercase()
    .not()
    .isNumeric()
    .not()
    .isAlpha(),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorLogin, validatorRegister };
