const express = require("express");
const router = express();

const { validatorCreateUser } = require("../Validators/user.validator");
const createFile = require("../utils/handleFileCreator.util");

const usersController = require("../controllers/users.controller");



module.exports = () => {
  router.post("/infoUsuario", usersController.getUserInfo)
  router.put("/actualizarRol/:id", usersController.updateRolUser);
  router.put("/habilitarUsuario/:id", usersController.enabledUser);
  router.put("/deshabilitarUsuario/:id", usersController.disabledUser);
  return router;
};


