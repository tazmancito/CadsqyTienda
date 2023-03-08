const express = require("express");
const router = express();

const infoFooterController = require("../controllers/infoFooter.controller");

module.exports = () => {
  router.get("/", infoFooterController.getInfoFooter);
  router.get("/:id", infoFooterController.getInfoFooterById);
  router.put("/:id", infoFooterController.updateInfoFooterById);
  return router;
};
