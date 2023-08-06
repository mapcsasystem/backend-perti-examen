const { Schema, model } = require("mongoose");
const RoleSchema = Schema(
  {
    rol: {
      type: String,
      required: [true, "El rol es obligatorio."],
      unique: true,
      // enum: ["ADMIN_ROL", "USER_ROL"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// RoleSchema.methods.toJSON = function () {
//   const { _id, ...rol } = this.toObject();
//   rol.uid = _id;
//   return;
// };

module.exports = model("Role", RoleSchema);
