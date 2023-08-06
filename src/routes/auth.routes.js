const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middleware/validate-fields");

const { loginController } = require("../controllers/auth.controller");
const {
  validateRole,
  emailExist,
  userNameExist,
  userByIdExist,
} = require("../helpers/db-validators");

const router = Router();
//! Routes Users
router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria.").not().isEmpty(),
    validarCampos,
  ],
  loginController
);

module.exports = router;
