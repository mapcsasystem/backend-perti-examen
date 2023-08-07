const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validateJWT } = require("../middleware");
const {
  getMoviesController,
  putMoviesController,
  deleteMoviesController,
  postMoviesController,
  getMovieController,
} = require("../controllers/movies.controller");
const { movieByIdNoExist } = require("../helpers/db-validators");
const router = Router();
//! Routes Movies
router.get(
  "/movies/get-all",
  [validateJWT, validarCampos],
  getMoviesController
);
router.get(
  "/movies/get-one/:id",
  [
    validateJWT,
    check("id", "El id no es válido.").isMongoId(),
    check("id").custom(movieByIdNoExist),
    validarCampos,
  ],
  getMovieController
);
router.post(
  "/movies/create",
  [
    validateJWT,
    check("name", "El name es obligatorio.").not().isEmpty(),
    check("description", "La descripcion es obligatoria.").not().isEmpty(),
    check("urlImage", "No es una url valida.").isURL(),
    validarCampos,
  ],
  postMoviesController
);

router.put(
  "/movies/update/:id",
  [
    validateJWT,
    check("id", "El id no es válido.").isMongoId(),
    check("id").custom(movieByIdNoExist),
    validarCampos,
  ],
  putMoviesController
);

router.delete(
  "/movies/delete/:id",
  [
    validateJWT,
    check("id", "El id no es válido.").isMongoId(),
    check("id").custom(movieByIdNoExist),
    validarCampos,
  ],

  deleteMoviesController
);

module.exports = router;
