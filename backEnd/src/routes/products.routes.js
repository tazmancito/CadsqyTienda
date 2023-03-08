const express = require("express");
const router = express();
const { authMiddleware } = require("../middleware/session");
const { checkPermissionsByRol } = require("../middleware/checkPermissions");

const { setRouteFile } = require("../middleware/setRouteFileUpload");
const { upload } = require("../utils/handleStorageByRouteUnique.util");
const { getPathFile } = require("../utils/handleGetPathFile");

const productController = require("../controllers/products.controller");

const imgProducts = "../" + process.env.CARPETAPRINCIPAL + "/assets/img/products";

module.exports = () => {
  router.get("/buscar-productos/:word", productController.getProductByName);
  router.get("/productos-orden-aleatorio", productController.getProductsAletoryOrder);
  router.get("/categoria/:categoria", productController.getAllProductsByCategory);
  return router;
};
