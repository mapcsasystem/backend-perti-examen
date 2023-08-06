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

const {
  validarCampos,
  validateJWT,
  isAdminRole,
  haveRole,
} = require("../middleware");
const router = Router();
//! Routes Users
router.get("/", [validateJWT], getUsersController);

router.post(
  "/",
  [
    validateJWT,
    haveRole("admin", "super admin", "user"),
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
  "/:id",
  [
    validateJWT,
    haveRole("admin", "super admin", "user"),
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
    validateJWT,
    // isAdminRole,
    haveRole("admin", "super admin"),
    check("id", "El id no es válido.").isMongoId(),
    check("id").custom(userByIdExist),
    validarCampos,
  ],
  deleteUserController
);

module.exports = router;
