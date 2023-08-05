const Role = require("../models/role.model");
const validateRole = async (rol = "") => {
  const exitRole = await Role.findOne({ rol });
  if (!exitRole) {
    throw new Error(`El role ${rol} no esta existe.`);
  }
};

module.exports = {
  validateRole,
};
