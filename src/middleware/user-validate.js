const User = require("../models/user.model");
const validateFieldsUniqueUser = async (req, res, next) => {
  const { email, userName } = req.body;
  // const user = new User({ email, userName });
  const existEmail = await User.findOne({ email });
  const arr = [];
  if (existEmail) {
    arr.push({
      msg: "El correo ya esta registrado",
    });
  }
  const existUserName = await User.findOne({ userName });
  if (existUserName) {
    arr.push({
      msg: "El userName ya esta registrado",
    });
  }
  if (existEmail || existUserName) {
    return res.status(400).json({
      sucess: false,
      errors: arr,
    });
  }
  next();
};

module.exports = {
  validateFieldsUniqueUser,
};
