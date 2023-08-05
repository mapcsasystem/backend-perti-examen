const { Router } = require("express");
const {
  getUsersController,
  postUserController,
  putUsersController,
  patchUserController,
  deleteUserController,
} = require("../controllers/users.controller");

const router = Router();
//! Routes Users
router.get("/", getUsersController);
router.post("/", postUserController);
router.put("/:id", putUsersController);
router.patch("/", patchUserController);
router.delete("/", deleteUserController);

module.exports = router;
