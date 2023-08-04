const { response, request } = require("express");

const getUsersController = (req = request, res = response) => {
  res.status(200).json({ success: true, data: "get hello" });
};

const postUserController = (req = request, res = response) => {
  res.status(200).json({ success: true, data: "post hello" });
};

const putUsersController = (req = request, res = response) => {
  res.status(200).json({ success: true, data: "put hello" });
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
