const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsersController,
  postUserController,
  putUsersController,
  deleteUserController,
} = require("../controllers/users.controller");
const {
  validateRole,
  emailExist,
  userNameExist,
  userByIdExist,
} = require("../helpers/db-validators");

const { validarCampos, validateJWT } = require("../middleware");
const router = Router();
//! Routes Users
router.get("/users/get-all", [validateJWT], getUsersController);

router.post(
  "/create",
  [
    validateJWT,
    check("email").custom(emailExist),
    check("userName").custom(userNameExist),
    check("fullName", "El fullName es obligatotio.").not().isEmpty(),
    check("email", "El correo no es válido.").isEmail(),
    check(
      "password",
      "El password tiene que ser más de 5 caracteres."
    ).isLength({ min: 6 }),
    check("userName", "El userName ya existe."),
    check("rol").custom(validateRole),
    validarCampos,
  ],
  postUserController
);

router.put(
  "/users/update/:id",
  [
    validateJWT,
    check("id", "El id no es válido.").isMongoId(),
    check("id").custom(userByIdExist),
    check("rol").custom(validateRole),
    validarCampos,
  ],
  putUsersController
);

router.delete(
  "/users/delete/:id",
  [
    validateJWT,
    check("id", "El id no es válido.").isMongoId(),
    check("id").custom(userByIdExist),
    validarCampos,
  ],
  deleteUserController
);

module.exports = router;
