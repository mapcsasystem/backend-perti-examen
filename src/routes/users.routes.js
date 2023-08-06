const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsersController,
  postUserController,
  putUsersController,
  deleteUserController,
} = require("../controllers/users.controller");
const { validarCampos } = require("../middleware/validate-fields");
const {
  validateRole,
  emailExist,
  userNameExist,
  userByIdExist,
} = require("../helpers/db-validators");
const router = Router();
//! Routes Users
router.get("/", getUsersController);

router.post(
  "/",
  [
    check("email").custom(emailExist),
    check("userName").custom(userNameExist),
    check("fullName", "El fullName es obligatotio.").not().isEmpty(),
    check("email", "El correo no es válido.").isEmail(),
    check(
      "password",
      "El password tiene que ser más de 6 caracteres."
    ).isLength({ min: 6 }),
    check("userName", "El userName ya existe."),
    check("rol").custom(validateRole),
    validarCampos,
  ],
  postUserController
);

router.put(
  "/:id",
  [
    check("id", "El id no es válido.").isMongoId(),
    check("id").custom(userByIdExist),
    check("rol").custom(validateRole),
    validarCampos,
  ],
  putUsersController
);

router.delete(
  "/:id",
  [
    check("id", "El id no es válido.").isMongoId(),
    check("id").custom(userByIdExist),
    validarCampos,
  ],
  deleteUserController
);

module.exports = router;
