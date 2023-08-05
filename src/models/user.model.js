const { Schema, model } = require("mongoose");
const UserSchema = Schema({
  fullName: {
    type: String,
    required: [true, "El name es obligatorio."],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio."],
  },
  rol: {
    type: String,
    required: [true, "El password es obligatorio."],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  userName: {
    type: String,
    required: [true, "El userName es obligatorio."],
    unique: true,
  },
});

module.exports = model("User", UserSchema);
