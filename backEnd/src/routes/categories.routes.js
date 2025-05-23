const express = require("express");
const router = express();
const { authMiddleware } = require("../middleware/session");
const { checkPermissionsByRol } = require("../middleware/checkPermissions");

const categoriesController = require("../controllers/categories.controller");

module.exports = () => {
  router.get("/", categoriesController.getAllCategories);
  router.get("/cat/:nombre", categoriesController.getCategoryByName);
  router.get("/categoria/:id", categoriesController.getCategory);
  router.get("/subCategorias", categoriesController.getAllSubCategories);
  router.get(
    "/subCategorias/:idFatherCategory",
    categoriesController.getSubCategoriesByCategory
  );
  return router;
};
