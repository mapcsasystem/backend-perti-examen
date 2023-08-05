const mongoose = require("mongoose");

const dbConnect = async () => {
  const DB_URI_MONGO = process.env.DB_URI_MONGO;
  try {
    await mongoose.connect(DB_URI_MONGO, {
      autoIndex: true,
    });
    console.log("conectado");
  } catch (error) {
    throw new Error("No se conecto");
  }
};

module.exports = { dbConnect };
