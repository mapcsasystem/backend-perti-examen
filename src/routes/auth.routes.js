const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middleware/validate-fields");

const {
  loginController,
  registerController,
} = require("../controllers/auth.controller");
const {
  validateRole,
  emailExist,
  userNameExist,
  userByIdExist,
} = require("../helpers/db-validators");

const router = Router();
//! Routes Users
router.post(
  "/auth/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria.").not().isEmpty(),
    validarCampos,
  ],
  loginController
);

router.post(
  "/auth/register",
  [
    check("email").custom(emailExist),
    check("userName").custom(userNameExist),
    check("fullName", "El fullName es obligatotio.").not().isEmpty(),
    check("email", "El correo no es válido.").isEmail(),
    check(
      "password",
      "El password tiene que ser más de 5 caracteres."
    ).isLength({ min: 6 }),
    check("userName", "El userName ya existe."),
    validarCampos,
  ],
  registerController
);

module.exports = router;
