const { request, response } = require("express");
const User = require("../models/user.model");
const isAdminRole = async (req = request, res = response, next) => {
  try {
    if (!req.userAuth) {
      return res.status(500).json({
        success: false,
        msg: "Hable con el administrador validar token correctamente.",
      });
    }
    const { rol, name } = req.userAuth;
    if (rol !== "admin") {
      return res.status(401).json({
        success: false,
        msg: "No es administrador.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      msg: "No autorizado.",
    });
  }
};

const haveRole = (...roles) => {
  return (req = request, res = response, next) => {
    // console.log(roles);
    // console.log(req.userAuth);
    if (!req.userAuth) {
      return res.status(500).json({
        success: false,
        msg: "Hable con el administrador validar token correctamente.",
      });
    }
    if (!roles.includes(req.userAuth.rol)) {
      return res.status(401).json({
        success: false,
        msg: "No tiene autorización.",
      });
    }

    next();
  };
};
module.exports = {
  isAdminRole,
  haveRole,
};
