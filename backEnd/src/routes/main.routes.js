const express = require("express");
const router = express();
const { authMiddleware } = require("../middleware/session");

module.exports = () => {
  router.get("/", (req,res) =>{
    res.status(204);
    res.send();
  });
  return router;
};
