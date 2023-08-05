const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");

const getUsersController = async (req = request, res = response) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const postUserController = async (req = request, res = response) => {
  try {
    const { fullName, email, password, rol, userName } = req.body;
    const user = new User({ fullName, email, password, rol, userName });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    user.email.toLowerCase();
    await user.save();
    res
      .status(201)
      .json({ success: true, msg: "Usuario creado correctamente", data: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const putUsersController = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { _id, password, enabled, email, userName, ...resto } = req.body;
    // TODO: validar contra base de datos
    if (password) {
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.status(200).json({
      success: true,
      msg: "Usuario Actualizado correctamente.",
      data: { user },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const patchUserController = (req = request, res = response) => {
  res.status(200).json({ success: true, data: "patch hello" });
};

const deleteUserController = (req = request, res = response) => {
  res.status(200).json({ success: true, data: "delete hello" });
};

module.exports = {
  getUsersController,
  postUserController,
  putUsersController,
  patchUserController,
  deleteUserController,
};
