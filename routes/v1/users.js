var express = require("express");
var router = express.Router();
var usersController = require("../../controllers/users");

router
  .get("/", usersController.list)
  .post("/", usersController.create);

router
  .get("/:id", usersController.show)
  .put("/:id", usersController.update)
  .delete("/:id", usersController.remove);

module.exports = router;
