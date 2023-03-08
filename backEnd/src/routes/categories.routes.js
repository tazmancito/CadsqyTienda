const express = require("express");
const router = express();
const { authMiddleware } = require("../middleware/session");
const { checkPermissionsByRol } = require("../middleware/checkPermissions");

const categoriesController = require("../controllers/categories.controller");

module.exports = () => {
  router.get("/", categoriesController.getAllCategories);
  router.get("/subCategorias", categoriesController.getAllSubCategories);
  return router;
};
