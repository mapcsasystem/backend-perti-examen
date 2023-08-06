const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const { generarJWT } = require("../helpers/generate-jwt");

const loginController = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "El correo ó contraseña no son correctos",
        data: {},
      });
    }
    if (!user.enabled) {
      return res.status(400).json({
        success: false,
        msg: "El correo ó contraseña no son correctos",
        data: {},
      });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        msg: "El correo ó contraseña no son correctos",
        data: {},
      });
    }

    const token = await generarJWT(user.id);
    res.status(200).json({
      success: true,
      msg: "Inicio de sesión correctamente",
      user,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Hable con el administrador", error });
  }
};

const registerController = async (req = request, res = response) => {
  try {
    const { fullName, email, password, userName } = req.body;
    const user = new User({ fullName, email, password, rol: "user", userName });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    user.email.toLowerCase();
    await user.save();
    res
      .status(201)
      .json({ success: true, msg: "Usuario creado correctamente", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Hable con el administrador".error });
  }
};

module.exports = {
  loginController,
  registerController,
};
