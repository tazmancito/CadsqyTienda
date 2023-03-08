const express = require("express");
const router = express();
const { authMiddleware } = require("../middleware/session");
const { checkPermissionsByRol } = require("../middleware/checkPermissions");

const { setRouteFile } = require("../middleware/setRouteFileUpload");
const { upload } = require("../utils/handleStorageByRouteUnique.util");
const { getPathFile } = require("../utils/handleGetPathFile");

const adminController = require("../controllers/admin.controller");

const pImgFiles = "../" + process.env.CARPETAPRINCIPAL + "/assets/backgrounds";

module.exports = () => {
  return router;
};
