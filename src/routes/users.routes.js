const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsersController,
  postUserController,
  putUsersController,
  patchUserController,
  deleteUserController,
} = require("../controllers/users.controller");
const { validarCampos } = require("../middleware/validate-fields");
const { validateFieldsUniqueUser } = require("../middleware/user-validate");
const router = Router();
//! Routes Users
router.get("/", getUsersController);
router.post(
  "/",
  [
    validateFieldsUniqueUser,
    check("fullName", "El fullName es obligatotio.").not().isEmpty(),
    check("email", "El correo no es válido.").isEmail(),
    check(
      "password",
      "El password tiene que ser más de 6 caracteres."
    ).isLength({ min: 6 }),
    // check("rol", "El rol no es válido").isIn(["ADMIN_ROL", "USER_ROL"]),
    //TODO: Validar si ya existe
    check("userName", "El userName ya existe."),
    validarCampos,
  ],
  postUserController
);
router.put("/:id", putUsersController);
router.patch("/", patchUserController);
router.delete("/", deleteUserController);

module.exports = router;
