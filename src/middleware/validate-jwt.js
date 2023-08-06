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
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = uid;
    const user = await User.findById(uid);

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
