const express = require("express");
const router = express();

const linksHeadersFooterController = require("../controllers/linksHeaderFooter.controller");

module.exports = () => {
  router.get("/", linksHeadersFooterController.getLinksHeadersFooter);
  router.get("/encabezado/:id", linksHeadersFooterController.getLinksHeadersFooterByHFId);
  router.get("/:id", linksHeadersFooterController.getLinksHeadersFooterById);
  router.post("/", linksHeadersFooterController.createLinkHeadersFooter);
  router.put("/:id", linksHeadersFooterController.updateLinkHeadersFooterById);
  router.delete(
    "/:id",
    linksHeadersFooterController.deleteLinkHeadersFooterById
  );
  return router;
};
