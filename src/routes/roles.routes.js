const { Router } = require("express");
const { check } = require("express-validator");
const {
  getRolesController,
  postRolesController,
  putRolesController,
  patchRolesController,
  deleteRolesController,
} = require("../controllers/roles.controller");
const { validarCampos } = require("../middleware/validate-fields");
const router = Router();
//! Routes Users
router.get("/", getRolesController);
router.post("/", [validarCampos], postRolesController);
router.put("/:id", putRolesController);
router.patch("/", patchRolesController);
// router.delete("/", deleteRolesController);

module.exports = router;
