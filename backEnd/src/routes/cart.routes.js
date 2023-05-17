const express = require("express");
const router = express();

const cartController = require("../controllers/cart.controller");

module.exports = () => {
  router.get("/:id", cartController.getCardByIdUser);
  router.post("/", cartController.createCart);
  router.post("/add-product", cartController.addProductCart);
  router.delete("/:id", cartController.deleteCart);
  return router;
};
