const { request, response } = require("express");
const Role = require("../models/role.model");
const User = require("../models/user.model");
const validateRole = async (rol = "") => {
  const exitRole = await Role.findOne({ rol });
  if (!exitRole) {
    throw new Error(`El role ${rol} no esta existe.`);
  }
};

const validateRoleExist = async (rol = "") => {
  const exitRole = await Role.findOne({ rol });
  if (exitRole) {
    throw new Error(`El role ${rol} ya existe.`);
  }
};
//#region Validacion users
//! Users Validations
const emailExist = async (email = "") => {
  const exitEmail = await User.findOne({ email });
  if (exitEmail) {
    throw new Error(`El email ${email} ya existe.`);
  }
};

const userNameExist = async (userName = "") => {
  const exitUserName = await User.findOne({ userName });
  if (exitUserName) {
    throw new Error(`El userName ${userName} ya existe.`);
  }
};

const userByIdExist = async (id = "") => {
  const exitUserById = await User.findById(id);
  if (!exitUserById) {
    throw new Error(`El id ${exitUserById} no existe.`);
  }
};

const rolByIdExist = async (id = "") => {
  const exitRolById = await Role.findById(id);
  if (!exitRolById) {
    throw new Error(`El id ${exitUserById} no existe.`);
  }
};
//#endregion users

module.exports = {
  validateRole,
  emailExist,
  userNameExist,
  userByIdExist,
  validateRoleExist,
  rolByIdExist,
};
