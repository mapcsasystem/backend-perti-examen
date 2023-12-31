const jwt = require("jsonwebtoken");

const generarJWT = (_id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { _id };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      { expiresIn: "10h" },
      (err, token) => {
        if (err) {
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };
