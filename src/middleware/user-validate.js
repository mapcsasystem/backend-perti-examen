const { request, response } = require("express");
const User = require("../models/user.model");
const validateFieldsUniqueUser = async (
  req = request,
  res = response,
  next
) => {
  const { email, userName } = req.body;
  // const user = new User({ email, userName });
  const existEmail = await User.findOne({ email: email.toLowerCase() });
  const arrayErrors = [];
  if (existEmail) {
    arrayErrors.push({
      msg: "El correo ya esta registrado",
    });
  }
  const existUserName = await User.findOne({ userName });
  if (existUserName) {
    arrayErrors.push({
      msg: "El userName ya esta registrado",
    });
  }
  if (existEmail || existUserName) {
    return res.status(400).json({
      sucess: false,
      errors: arrayErrors,
    });
  }
  next();
};

module.exports = {
  validateFieldsUniqueUser,
};
