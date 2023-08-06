const validarCampos = require("./validate-fields");
const validateJWT = require("./validate-jwt");
const validateRole = require("./validate-roles");

module.exports = {
  ...validarCampos,
  ...validateJWT,
  ...validateRole,
};
