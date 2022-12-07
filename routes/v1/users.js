const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users");

router
  .get("/", usersController.list)
  .post("/", usersController.create);

router
  .get("/:id", usersController.show)
  .put("/:id", usersController.update)
  .delete("/:id", usersController.remove);

module.exports = router;
