const { Schema, model } = require("mongoose");
const MoviesSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El name es obligatorio."],
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria."],
    },
    urlImage: {
      type: String,
      required: [true, "La url de la imagen es obligatoria."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// MoviesSchema.methods.toJSON = function () {
//   const { ...movie } = this.toObject();
//   return movie;
// };

module.exports = model("Movie", MoviesSchema);
