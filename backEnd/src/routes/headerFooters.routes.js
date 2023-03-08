const express = require("express");
const router = express();

const headersFootersController = require("../controllers/headersFooter.controller");

module.exports = () => {
  router.get("/", headersFootersController.getHeadersFooter);
  router.get("/:id", headersFootersController.getHeadersFooterById);
  router.post("/", headersFootersController.createHeadersFooter)
  router.put("/:id", headersFootersController.updateHeadersFooterById);
  router.delete("/:id", headersFootersController.deleteHeadersFooterById);
  return router;
};
