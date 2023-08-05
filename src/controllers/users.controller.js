const { response, request } = require("express");

const getUsersController = (req = request, res = response) => {
  const query = request.query;
  res.status(200).json({ success: true, data: "get hello" });
};

const postUserController = (req = request, res = response) => {
  const { name, id } = req.body;
  res.status(201).json({ success: true, data: { name, id } });
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
