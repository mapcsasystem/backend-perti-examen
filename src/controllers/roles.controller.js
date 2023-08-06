const { response, request } = require("express");
const Role = require("../models/role.model");

const getRolesController = async (req = request, res = response) => {
  const roles = await Role.find();
  res.status(200).json({ success: true, msg: "", roles });
};

const postRolesController = async (req = request, res = response) => {
  const { rol } = req.body;
  const role = new Role({ rol });
  role.save();
  res.status(201).json({ success: true, msg: "Role creado con exito.", role });
};

const deleteRolesController = (req = request, res = response) => {
  res
    .status(200)
    .json({
      success: true,
      msg: "Role borrado con exito.",
      data: "delete hello",
    });
};

module.exports = {
  getRolesController,
  postRolesController,
  deleteRolesController,
};
