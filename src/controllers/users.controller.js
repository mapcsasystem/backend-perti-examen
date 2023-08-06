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

    res.status(200).json({ success: true, data: users, count });
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

const deleteUserController = async (req = request, res = response) => {
  const { id } = req.params;
  //! Borrar fisicamente
  //! const user = await User.findByIdAndDelete(id);

  //! Borrar fisicamente
  const user = await User.findByIdAndUpdate(id, { enabled: false });
  res.status(200).json({ success: true, data: { id } });
};

module.exports = {
  getUsersController,
  postUserController,
  putUsersController,
  deleteUserController,
};
