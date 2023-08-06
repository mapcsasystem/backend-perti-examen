const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");

const getUsersController = async (req = request, res = response) => {
  try {
    const query = { enabled: true };
    const count = await User.count(query);
    const { limit = count, skip = 0 } = req.query;
    const users = await User.find(query).skip(+skip).limit(+limit);

    // const[count,users]=await Promise.all([
    //   User.count(query),
    //   User.find(query).skip(+skip).limit(+limit);
    // ])

    res.status(200).json({ success: true, users, count });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Hable con el administrador".error });
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
      .json({ success: true, msg: "Usuario creado correctamente", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Hable con el administrador".error });
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
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Hable con el administrador".error });
  }
};

const deleteUserController = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    //! Borrar fisicamente
    //! const user = await User.findByIdAndDelete(id);

    //! Borrar fisicamente
    const user = await User.findByIdAndUpdate(id, { enabled: false });
    console.log(req.userAuth);
    if (user.rol === req.userAuth.rol) {
      return res.status(403).json({
        success: true,
        msg: "No se puede borrar a si mismo.",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Usuario borrado correctamente.",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Hable con el administrador".error });
  }
};

module.exports = {
  getUsersController,
  postUserController,
  putUsersController,
  deleteUserController,
};
