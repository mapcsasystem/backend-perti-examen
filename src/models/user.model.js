const { Schema, model } = require("mongoose");
const UserSchema = Schema(
  {
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
      required: [true, "El rol es obligatorio."],
      // enum: ["ADMIN_ROL", "USER_ROL"],
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// //!Sobre escribir metodo tiene que ser una funcion normal
UserSchema.methods.toJSON = function () {
  const { password, ...user } = this.toObject();
  // user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
