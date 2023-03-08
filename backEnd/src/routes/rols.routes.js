const express = require("express");
const router = express();
const { authMiddleware } = require("../middleware/session");
const { checkPermissionsByRol } = require("../middleware/checkPermissions");

const rolsController = require("../controllers/rols.controller");

module.exports = () => {
  router.get(
    "/",
    authMiddleware,
    checkPermissionsByRol("getRoles"),
    rolsController.getRols
  );

  //router.get("/", rolsController.getRols);

  router.get(
    "/:id",
    authMiddleware,
    checkPermissionsByRol("getRolesById"),
    rolsController.getRolById
  );
  router.post("/", rolsController.createRol);
  router.put("/:id", rolsController.updateRolById);
  router.delete("/:id", rolsController.deleteRolById);
  return router;
};
