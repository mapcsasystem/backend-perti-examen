const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");

const getUsersController = (req = request, res = response) => {
  const query = request.query;
  res.status(200).json({ success: true, data: "get hello" });
};

const postUserController = async (req = request, res = response) => {
  const { fullName, email, password, rol, userName } = req.body;
  const user = new User({ fullName, email, password, rol, userName });
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  user.email.toLowerCase();
  await user.save();
  res.status(201).json({ success: true, data: user });
};

const putUsersController = (req = request, res = response) => {
  const { id } = req.params;
  res.status(200).json({ success: true, data: id });
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
