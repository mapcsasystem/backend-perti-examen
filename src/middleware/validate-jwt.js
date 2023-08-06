const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "No autorizado.",
    });
  }
  try {
    const { _id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req._id = _id;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "No autorizado.",
      });
    }
    if (!user.enabled) {
      return res.status(401).json({
        success: false,
        msg: "No autorizado.",
      });
    }
    req.userAuth = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      msg: "No autorizado.",
    });
  }
};
module.exports = {
  validateJWT,
};
