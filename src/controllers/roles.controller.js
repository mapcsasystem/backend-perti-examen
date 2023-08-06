const { response, request } = require("express");
const Role = require("../models/role.model");

const getRolesController = (req = request, res = response) => {
  const query = request.query;
  res.status(200).json({ success: true, msg: "", data: "get hello" });
};

const postRolesController = async (req = request, res = response) => {
  const { rol } = req.body;
  const role = new Role();

  res.status(201).json({ success: true, msg: "", data: role });
};

const deleteRolesController = (req = request, res = response) => {
  res.status(200).json({ success: true, msg: "", data: "delete hello" });
};

module.exports = {
  getRolesController,
  postRolesController,
  deleteRolesController,
};
