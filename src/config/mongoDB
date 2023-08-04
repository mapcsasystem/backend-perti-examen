const mongoose = require("mongoose");

const dbConnect = async () => {
  const DB_URI_MONGO = process.env.DB_URI_MONGO;
  try {
    await mongoose.connect(DB_URI_MONGO);
    console.log("conectado");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
