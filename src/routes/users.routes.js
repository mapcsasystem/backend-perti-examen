const { Router } = require("express");
const {
  getUsersController,
  postUserController,
  putUsersController,
  patchUserController,
  deleteController,
} = require("../controllers/users.controller");

const router = Router();
//! Routes Users
router.get("/", getUsersController);
router.post("/", postUserController);
router.put("/", putUsersController);
router.patch("/", patchUserController);
router.delete("/", deleteController);

module.exports = router;
