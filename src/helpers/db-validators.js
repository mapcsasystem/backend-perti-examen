const { request, response } = require("express");
const Role = require("../models/role.model");
const User = require("../models/user.model");
const Movie = require("../models/movie.model");
const validateRole = async (rol = "") => {
  const exitRole = await Role.findOne({ rol });
  if (!exitRole) {
    throw new Error(`El role ${rol} no existe.`);
  }
};
const rolByIdExist = async (id = "") => {
  const exitRolById = await Role.findById(id);
  if (!exitRolById) {
    throw new Error(`El id ${id} no existe.`);
  }
};

const validateRoleExist = async (rol = "") => {
  const exitRole = await Role.findOne({ rol });
  if (exitRole) {
    throw new Error(`El role ${rol} ya existe.`);
  }
};
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
    throw new Error(`El id ${id} no existe.`);
  }
};

const movieByIdNoExist = async (id = "") => {
  const exitMovieById = await Movie.findById(id);
  if (!exitMovieById) {
    throw new Error(`El id ${id} no existe.`);
  }
};

module.exports = {
  validateRole,
  emailExist,
  userNameExist,
  userByIdExist,
  validateRoleExist,
  rolByIdExist,
  movieByIdNoExist,
};
