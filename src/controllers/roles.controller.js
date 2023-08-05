const { response, request } = require("express");
const Role = require("../models/role.model");

const getRolesController = (req = request, res = response) => {
  const query = request.query;
  res.status(200).json({ success: true, data: "get hello" });
};

const postRolesController = async (req = request, res = response) => {
  const { rol } = req.body;
  const role = new Role();
  const rolTemp = await role.findByOne(rol);

  res.status(201).json({ success: true, data: role });
};

const putRolesController = (req = request, res = response) => {
  const { id } = req.params;
  res.status(200).json({ success: true, data: id });
};

const patchRolesController = (req = request, res = response) => {
  res.status(200).json({ success: true, data: "patch hello" });
};

const deleteRolesController = (req = request, res = response) => {
  res.status(200).json({ success: true, data: "delete hello" });
};

module.exports = {
  getRolesController,
  postRolesController,
  putRolesController,
  patchRolesController,
  deleteRolesController,
};
