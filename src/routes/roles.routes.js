const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, haveRole } = require("../middleware");
const {
  getRolesController,
  postRolesController,
  deleteRolesController,
} = require("../controllers/roles.controller");
const { validarCampos } = require("../middleware/validate-fields");
const { validateRoleExist, rolByIdExist } = require("../helpers/db-validators");
const router = Router();
//! Routes Users
router.get("/", [validateJWT], getRolesController);
router.post(
  "/",
  [
    validateJWT,
    check("rol").custom(validateRoleExist),
    check("rol", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  postRolesController
);
router.delete(
  "/:id",
  [
    validateJWT,
    haveRole("super admin"),
    check("id", "El id no es válido.").isMongoId(),
    check("id").custom(rolByIdExist),
    validarCampos,
  ],

  deleteRolesController
);

module.exports = router;
