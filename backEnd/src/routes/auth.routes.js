const express = require("express");
const router = express();
const {
  validatorLogin,
  validatorRegister,
} = require("../Validators/auth.validator");

const authController = require("../controllers/auth.controller");

const createFile = require("../utils/handleFileCreator.util");

//todo http://localhost:3000/api/auth

/**
 * ruta para register user
 */
module.exports = () => {
  //se oculto la ruta para que no se puedan hacer registros
  router.post("/register", validatorRegister, createFile, authController.registerUser);
  router.post("/login", validatorLogin, authController.loginUser);
  router.post("/validar", authController.verifyUserToken);
  router.post("/infoUsuario", authController.getUserInfo);
  router.delete("/:id", authController.deleteUser);
  return router;
};
