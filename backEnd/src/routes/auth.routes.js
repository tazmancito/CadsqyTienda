const express = require("express");
const router = express();
const {
  validatorLogin,
  validatorRegister,
} = require("../Validators/auth.validator");
const {
  registerUser,
  loginUser,
  verifyUserToken,
  getUserInfo
} = require("../controllers/auth.controller");

const createFile = require("../utils/handleFileCreator.util");

//todo http://localhost:3000/api/auth

/**
 * ruta para register user
 */
module.exports = () => {
  //se oculto la ruta para que no se puedan hacer registros
  router.post("/register", validatorRegister, createFile, registerUser);
  // router.post("/register", validatorRegister, createFile, registerUser);

  /**
   * ruta para login
   */
  router.post("/login", validatorLogin, loginUser);
  router.post("/validar", verifyUserToken);
  router.post("/infoUsuario", getUserInfo);
  return router;
};
